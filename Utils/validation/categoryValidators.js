const { check} = require('express-validator')
const validationMiddleware = require("../../middlewares/validationmiddleware");

exports.getValidationCategory = [
    check('id').isMongoId().withMessage("invalid category id"),
    validationMiddleware
];

exports.createValidationCategory =[
    check('name')
    .isEmpty()
    .withMessage("This category is required")
    .isLength({min : 3})
    .withMessage("Too short category name")
    .isLength({max : 30})
    .withMessage("Too long category name")
    ,validationMiddleware
];

exports.updateValidationCategory = [
    check('id').isMongoId().withMessage("invalid category id"),
    validationMiddleware
];


exports.deleteValidationCategory = [
    check('id').isMongoId().withMessage("invalid category id"),
    validationMiddleware
];