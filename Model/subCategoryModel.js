const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true, // to delete any space before/after subcategory name
      unique: [true, "this Subcategory must be Unique"],
      minlength: [2, "Too short subCategory name"],
      maxlength: [32, "Too long Subcategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category", // name of main category
      required: [true, "this Subcategory is required"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
