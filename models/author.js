const mongoose = require("mongoose");
const validate = require("mongoose-validator");

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 20],
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

module.exports = mongoose.model("Author", authorSchema);
