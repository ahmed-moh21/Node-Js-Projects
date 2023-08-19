const multer = require("multer");
const sharp = require("sharp");
const { uuid } = require("uuidv4");
const ApiError = require("../Utils/apiError");
const asyncHandler = require("express-async-handler");

// 1) memoryStorage multer

const storage = multer.memoryStorage();

const multerFilter = function (req, file, cd) {
  if (file.mimetipe.startWith("image")) {
    cd(null, true);
  } else {
    cd(new ApiError("Only Image Uploded", 400), false);
  }
};
const upload = multer({ storage: storage, fileFilter: multerFilter });

exports.uploadCtegoryImage = upload.single("image");

//using Sharb to be proseccing image

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `category-${uuid()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/category/${fileName}`);

  req.body = fileName;
  next();
});
