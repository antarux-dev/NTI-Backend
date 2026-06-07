import multer from "multer";
import { uuidv7 } from "uuidv7";

const base_filepath = 'src/uploads/';

export const DOCUMENT_PATH = {
  PRIVATE: base_filepath + 'private/',
  PUBLIC: base_filepath + 'public/',
  INTERNAL: base_filepath + 'internal/',
};

interface UploaderOptions {
  path: string;
  fileFilter?: (req: Request, file: Express.Multer.File, next: (error: Error | null, acceptFile: boolean) => void) => void;
  limits?: number;
  preservePath?: boolean;
  defParamCharset?: string;
};

// * Override spôsobu uloženia kvôli tomu aby sme mohli mať custom názvy súborov (uuidv7)
function createDiskStorage(options: UploaderOptions) {
  const { path } = options;

  return multer.diskStorage({
    destination: function (req, file, next) {
      next(null, path);
    },
    filename: function (req, file, next) {
      next(null, uuidv7());
    }
  });
};

export const uploader = (options: UploaderOptions) => {
  const storage = createDiskStorage(options);
  return multer({ storage });
};

export const publicUploader = () => {
  const storage = createDiskStorage({ path: DOCUMENT_PATH.PUBLIC });
  return multer({ storage });
};

export const privateUploader = () => {
  const storage = createDiskStorage({ path: DOCUMENT_PATH.PRIVATE });
  return multer({ storage });
};

export const internalUploader = () => {
  const storage = createDiskStorage({ path: DOCUMENT_PATH.INTERNAL });
  return multer({ storage });
};

// TODO: Fukncia pre uloženie do db možno tu? inak v db middleware
// TODO: Pridať custom errori pre možné chyby zo súbormi