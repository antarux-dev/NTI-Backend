-- Typy vytvorené na mieru pre náš projekt TYPES
CREATE TYPE public.user_status AS ENUM
    ('pending', 'active', 'suspended', 'deleted');

ALTER TYPE public.user_status
    OWNER TO nti_user;

COMMENT ON TYPE public.user_status
    IS 'Popisuje stav používateľa.';

CREATE TYPE public.application_status AS ENUM
    ('draft', 'submitted', 'formal_check', 'under_review', 'revision_requested', 'approved', 'rejected', 'onboarding', 'active', 'completed', 'archived');

ALTER TYPE public.application_status
    OWNER TO nti_user;

COMMENT ON TYPE public.application_status
    IS 'Stav žiadosti o projekt.';

CREATE TYPE public.call_status AS ENUM
    ('draft', 'open', 'closed', 'evaluating', 'finished');

ALTER TYPE public.call_status
    OWNER TO nti_user;

COMMENT ON TYPE public.call_status
    IS 'Stav výziev.';

CREATE TYPE public.mentorship_status AS ENUM
    ('proposed', 'active', 'paused', 'completed');

ALTER TYPE public.mentorship_status
    OWNER TO nti_user;

COMMENT ON TYPE public.mentorship_status
    IS 'Stav používateľa ako mentora';

CREATE TYPE public.milestone_status AS ENUM
    ('pending', 'in_progress', 'completed', 'delayed');

ALTER TYPE public.milestone_status
    OWNER TO nti_user;

COMMENT ON TYPE public.milestone_status
    IS 'Stav hlavných bodov projektu';

CREATE TYPE public.document_classification AS ENUM
    ('public', 'internal', 'confidential');

ALTER TYPE public.document_classification
    OWNER TO nti_user;

COMMENT ON TYPE public.document_classification
    IS 'Správa prístupu pre zobrazenie dokumentov';

CREATE TYPE public.decision_status AS ENUM
    ('approve', 'reject', 'revise');

ALTER TYPE public.decision_status
    OWNER TO nti_user;

COMMENT ON TYPE public.decision_status
    IS 'Možnosti rozhodnutia';

-- Tabulky TABLES

CREATE TABLE IF NOT EXISTS public.programs
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    code text NOT NULL,
    name text NOT NULL,
    description text,
    rules jsonb,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.calls
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    program_id integer NOT NULL,
    title text NOT NULL,
    description text,
    open_date timestamp without time zone NOT NULL,
    deadline timestamp without time zone NOT NULL,
    status call_status NOT NULL DEFAULT 'draft',
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    phone text,
    status user_status NOT NULL DEFAULT 'pending',
    email_verified boolean NOT NULL DEFAULT FALSE,
    gdpr_consent boolean NOT NULL DEFAULT FALSE,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.organisations
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    ico text,
    sector text,
    description text,
    website text,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id),
    UNIQUE (ico)
);

CREATE TABLE IF NOT EXISTS public.teams
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    leader_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.applications
(
    id uuid NOT NULL DEFAULT uuidv7(),
    call_id integer NOT NULL,
    submitting_user_id integer NOT NULL,
    team_id integer,
    organization_id integer,
    status application_status NOT NULL DEFAULT 'draft',
    submitted_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id)
);

COMMENT ON TABLE public.applications
    IS 'ID týmu a organizácie sú optional. Preto treba v aplikácii zabezpečiť aby aspoň jedno znich bolo vyplnené ';

CREATE TABLE IF NOT EXISTS public.attachments
(
    id uuid NOT NULL DEFAULT uuidv7(),
    application_id uuid,
    original_name text NOT NULL,
    storage_path text NOT NULL,
    mime_type text NOT NULL,
    file_size bigint NOT NULL,
    uploaded_by integer NOT NULL,
    version integer NOT NULL DEFAULT 1,
    document_type text NOT NULL,
    classification document_classification NOT NULL DEFAULT 'internal',
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.evaluations
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    application_id uuid NOT NULL,
    evaluator_user_id integer NOT NULL,
    comments text,
    decision decision_status,
    overall_score numeric(5, 2),
    evaluated_at timestamp without time zone NOT NULL DEFAULT now(),
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.roles
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id),
    UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.users_roles
(
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    granted_at timestamp without time zone NOT NULL DEFAULT now(),
    granted_by integer,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS public.organisation_members
(
    organisation_id integer NOT NULL,
    user_id integer NOT NULL,
    role_in_organisation text NOT NULL,
    is_primary_contact boolean NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id, organisation_id)
);

CREATE TABLE IF NOT EXISTS public.student_profiles
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL,
    study_program text NOT NULL,
    study_year integer NOT NULL,
    skills jsonb,
    grade_avg numeric(4, 2),
    cv_document_id uuid,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id),
    UNIQUE (user_id)
);

CREATE TABLE IF NOT EXISTS public.teams_users
(
    team_id integer NOT NULL,
    user_id integer NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (team_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.call_criteria
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    call_id integer NOT NULL,
    name text NOT NULL,
    description text,
    max_score numeric(5, 2) NOT NULL,
    weight numeric(4, 2) NOT NULL DEFAULT 1.0,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.application_evaluation_scores
(
    evaluation_id integer NOT NULL,
    call_criteria_id integer NOT NULL,
    score numeric(5, 2) NOT NULL,
    score_comment text,
    PRIMARY KEY (evaluation_id, call_criteria_id)
);

CREATE TABLE IF NOT EXISTS public.mentorships
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    application_id uuid NOT NULL,
    mentor_user_id integer NOT NULL,
    status mentorship_status NOT NULL DEFAULT 'proposed',
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    notes text,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id),
    UNIQUE (application_id)
);

CREATE TABLE IF NOT EXISTS public.milestones
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    mentorship_id integer NOT NULL,
    title text NOT NULL,
    description text,
    deadline timestamp without time zone NOT NULL,
    status milestone_status NOT NULL DEFAULT 'pending',
    completion_date timestamp without time zone,
    notes text,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.audit_events
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    table_name text NOT NULL,
    record_id text NOT NULL,
    action text NOT NULL,
    actor_user_id integer,
    old_values jsonb,
    new_values jsonb,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.calls
    ADD FOREIGN KEY (program_id)
    REFERENCES public.programs (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT
    NOT VALID;


ALTER TABLE IF EXISTS public.teams
    ADD FOREIGN KEY (leader_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT
    NOT VALID;


ALTER TABLE IF EXISTS public.applications
    ADD FOREIGN KEY (call_id)
    REFERENCES public.calls (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT
    NOT VALID;


ALTER TABLE IF EXISTS public.applications
    ADD FOREIGN KEY (submitting_user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT
    NOT VALID;


ALTER TABLE IF EXISTS public.applications
    ADD FOREIGN KEY (team_id)
    REFERENCES public.teams (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE IF EXISTS public.applications
    ADD FOREIGN KEY (organization_id)
    REFERENCES public.organisations (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE IF EXISTS public.attachments
    ADD FOREIGN KEY (application_id)
    REFERENCES public.applications (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.attachments
    ADD FOREIGN KEY (uploaded_by)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.evaluations
    ADD FOREIGN KEY (application_id)
    REFERENCES public.applications (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.evaluations
    ADD FOREIGN KEY (evaluator_user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT
    NOT VALID;


ALTER TABLE IF EXISTS public.users_roles
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.users_roles
    ADD FOREIGN KEY (role_id)
    REFERENCES public.roles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.users_roles
    ADD FOREIGN KEY (granted_by)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.organisation_members
    ADD FOREIGN KEY (organisation_id)
    REFERENCES public.organisations (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.organisation_members
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.student_profiles
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.teams_users
    ADD FOREIGN KEY (team_id)
    REFERENCES public.teams (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.teams_users
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.call_criteria
    ADD FOREIGN KEY (call_id)
    REFERENCES public.calls (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.application_evaluation_scores
    ADD FOREIGN KEY (evaluation_id)
    REFERENCES public.evaluations (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.application_evaluation_scores
    ADD FOREIGN KEY (call_criteria_id)
    REFERENCES public.call_criteria (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT
    NOT VALID;


ALTER TABLE IF EXISTS public.mentorships
    ADD FOREIGN KEY (application_id)
    REFERENCES public.applications (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT
    NOT VALID;


ALTER TABLE IF EXISTS public.mentorships
    ADD FOREIGN KEY (mentor_user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT
    NOT VALID;


ALTER TABLE IF EXISTS public.milestones
    ADD FOREIGN KEY (mentorship_id)
    REFERENCES public.mentorships (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.audit_events
    ADD FOREIGN KEY (actor_user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;