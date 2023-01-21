const mongoose = require("./index");
const Schema = mongoose.Schema;
const model = mongoose.model(
  "Course",
  Schema({
    id: Number,
    title: String,
    description: String,
    percentComplete: Number,
    favorite: Boolean,
  })
);
module.exports = model;
