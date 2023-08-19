const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationmiddleware");

/* exports.getValidationCategory = [
    check('id').isMongoId().withMessage("invalid category id"),
    validationMiddleware
];
 */
exports.createValidationSubCategory = [
  check("name")
    .isEmpty()
    .withMessage("This category is required")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .isLength({ max: 30 })
    .withMessage("Too long category name"),
  check("category")
    .isEmpty()
    .withMessage("sub category must be belong to category")
    .isMongoId()
    .withMessage("invalid category id format"),
  validationMiddleware
];
/* 
exports.updateValidationCategory = [
    check('id').isMongoId().withMessage("invalid category id"),
    validationMiddleware
];


exports.deleteValidationCategory = [
    check('id').isMongoId().withMessage("invalid category id"),
    validationMiddleware
]; */
