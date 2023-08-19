const mongoose = require("mongoose");

// Schema
// 1- create schema
const { Schema } = mongoose;
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "This category is required"],
      unique: [true, "category must be Unique"],
      minlength: [3, "Too short category name"],
      maxlength: [30, "Too long category name"],
    },
    // replace any space to " _ " such as => A and B it become a_and_b  ==> "shopping.com/a_and_b"
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

//midleware mongoose  URL
const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categorys/${doc.image}`;
    doc.image = imageUrl;
  }
};

CategorySchema.post("init", (doc) => {
    setImageUrl(doc);
});

// for create
CategorySchema.post("save", (doc) => {
    setImageUrl(doc);
});

// 2- schema Model
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
