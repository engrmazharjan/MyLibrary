const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Book = require("./book");

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Name should be between 3 and 50 characters",
  }),
];

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator,
  },
});

authorSchema.pre("deleteOne", { document: true }, async function (next) {
  const authorId = this._id;
  try {
    const bookCount = await Book.countDocuments({ author: authorId });
    if (bookCount > 0) {
      throw new Error("This Author Has Books Still");
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Author", authorSchema);
