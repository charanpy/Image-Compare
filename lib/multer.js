import multer from 'multer';
import path from 'path';

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error('Invalid File Type'));
  }
}

const uploadFile = multer({
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

export default uploadFile;
