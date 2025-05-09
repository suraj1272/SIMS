const mongoose = require("mongoose");
const StdDetailsSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  usn: {
    type: String,
    required: true,
    unique: true,
  },
  sem: {
    type: Number,
  },
  div: {
    type: String,
  },
  branch: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const StdModel = mongoose.model("StdDetails", StdDetailsSchema);
module.exports = StdModel;
