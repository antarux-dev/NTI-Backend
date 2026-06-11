import { Router } from 'express';
import {
  getStudentProfile,
  updateStudentProfile,
  //uploadStudentCv,
  //getCompanyProfile,
  //updateCompanyProfile,
  //getCompanyProjects,
  //createCompanyProject,
  //getCompanyProjectById,
  //getCompanyMembers,
  //inviteCompanyMember,
  //generateInviteToken,
} from './organizations.controller.js';

const router = Router();

//student
router.get('/profile/student', getStudentProfile);
router.patch('/profile/student', updateStudentProfile);
//router.post('/profile/student/cv', uploadStudentCv);

//company
//router.get('/profile/company', getCompanyProfile);
//router.patch('/profile/company', updateCompanyProfile);

//projects
//router.get('/company/projects', getCompanyProjects);
//router.post('/company/projects', createCompanyProject);
//router.get('/company/projects/:id', getCompanyProjectById);

//members
//router.get('/company/members', getCompanyMembers);
//router.post('/company/members/invite', inviteCompanyMember);
//router.post('/company/members/token', generateInviteToken);

export default router;
