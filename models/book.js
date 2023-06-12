const mongoose = require("mongoose");
const validate = require("mongoose-validator");

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
  coverImage: {
    type: Buffer,
    required: true,
  },
  coverImageType: {
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
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Book", bookSchema);
