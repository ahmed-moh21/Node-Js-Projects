const express = require("express");
const router = express.Router({mergeParams : true});

const {createSubCategories} = require("../Services/subCategoryServices");


const {createValidationSubCategory} = require("../Utils/validation/subCategoryValidators")


router.route('/').post(createValidationSubCategory,createSubCategories)


module.exports = router;