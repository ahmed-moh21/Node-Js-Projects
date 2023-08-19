const express = require("express");
const router = express.Router();
const {
  createCategories,
  getCategories,
  getoneCategory,
  ubdateCategories,
  deletCategories,
} = require("../Services/categoryServices");

const {
  getValidationCategory,
  createValidationCategory,
  updateValidationCategory,
  deleteValidationCategory,
} = require("../Utils/validation/categoryValidators");

const {
  uploadCtegoryImage,
  resizeImage,
} = require("../middlewares/multerMidelware");

const subcategoryRoute = require("./subCategoryRoute");

router.use("/:categoryId/subcategory", subcategoryRoute);
router
  .route("/")
  .post(
    uploadCtegoryImage,
    resizeImage,
    createValidationCategory,
    createCategories
  )
  .get(getCategories);

router
  .route("/:id")
  .get(getValidationCategory, getoneCategory)
  .put(updateValidationCategory, ubdateCategories)
  .delete(deleteValidationCategory, deletCategories);

module.exports = router;
