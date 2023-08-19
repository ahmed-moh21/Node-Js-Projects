const slugify = require('slugify')
const CategoryModel = require("../Model/categoryModel");
const asyncHandler = require('express-async-handler')
const ApiError = require("../Utils/apiError")



// @desc create category
// @route POST /api/v1/categories
// @access  privet *
exports.createCategories = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await CategoryModel.create({ name, slug: slugify(name) });0

    res.status(201).json({ data: category })
});



// @desc get all category
// @route GET /api/v1/categories
// @access  public *
exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: categories.length, data: categories, page })
});


//@desc get one category
//@route GET /api/vi/categories/:id
//@access public *
exports.getoneCategory = asyncHandler(async (req, res , next) => {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);
    if (!category) {
       return next( new ApiError(`there is no category for this : ${id}` , 404))
    }

    res.status(200).json({ data: category })
})


//@desc Update spasific categories by id
//@route PUT /api/vi/categories/:id
//@access priver *

exports.ubdateCategories = asyncHandler(async (req, res , next) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await CategoryModel.findByIdAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
    );

    if (!category) {
        return next( new ApiError(`there is no category for this : ${id}` , 404))
    }

    res.status(200).json({ data: category });
})


//@desc delete one of category
//@route DELET /api/v1/categories/:id
//@access private *

exports.deletCategories = asyncHandler(async (req, res , next) => {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
        return next( new ApiError(`there is no category for this : ${id}` , 404))
    }

    res.status(200).json({ data: category });

})