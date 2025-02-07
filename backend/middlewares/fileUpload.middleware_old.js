// import multer from "multer";
// import path from "path";

// const uploadDir = path.join(path.resolve(), "./public/uploads/");

// const storage_config = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(null,'/public/uploads'); // this public folder is the one which is the direct child of post-away directory
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     const name = Date.now() + file.originalname;
//     cb(null, name);
//   },
// });

// export const uploadFile = multer({
//   storage: storage_config,
// });

import multer from "multer";

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images are allowed"));
  }
};

export const uploadFile = multer({
  storage: imgconfig,
  fileFilter: isImage,
});
