const mongoose = require("mongoose");
const path = require("path");
const validate = require("mongoose-validator");

const coverImageBasePath = "uploads/bookCovers";

const bookNameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Name should be between 3 and 50 characters",
  }),
];

const bookDescriptionValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 500],
    message: "Name should be between 3 and 50 characters",
  }),
];

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: bookNameValidator,
  },
  description: {
    type: String,
    validate: bookDescriptionValidator,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImageName: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
});

bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImageName != null) {
    return path.join("/", coverImageBasePath, this.coverImageName);
  }
});

module.exports = mongoose.model("Book", bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;
