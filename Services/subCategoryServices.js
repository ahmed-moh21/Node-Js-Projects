const slugify = require("slugify");
const subCategoryModel = require("../Model/subCategoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../Utils/apiError");

// @desc create Subcategory
// @route POST /api/v1/categories
// @access  privet *
exports.createSubCategories = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const SubCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });

  res.status(201).json({ data: SubCategory });
});

// @desc get all sub category
// @route GET /api/v1/categories
// @access  public *
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const subcategories = await subCategoryModel
    .find(filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ results: subcategories.length, data: subcategories, page });
});

//@desc get one sub category
//@route GET /api/vi/categories/:id
//@access public *
exports.getoneCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subcategory = await subCategoryModel.findById(id);
  if (!subcategory) {
    return next(new ApiError(`there is no category for this : ${id}`, 404));
  }

  res.status(200).json({ data: subcategory });
});

//@desc Update spasific SUB categories by id
//@route PUT /api/vi/categories/:id
//@access priver *

exports.ubdateSubCategories = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subcategory = await subCategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subcategory) {
    return next(new ApiError(`there is no category for this : ${id}`, 404));
  }

  res.status(200).json({ data: subcategory });
});

//@desc delete one of  subcategory
//@route DELET /api/v1/categories/:id
//@access private *

exports.deletSubCategories = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subCategoryModel.findByIdAndDelete(id);

  if (!subcategory) {
    return next(new ApiError(`there is no sub category for this : ${id}`, 404));
  }

  res.status(200).json({ data: subcategory });
});
