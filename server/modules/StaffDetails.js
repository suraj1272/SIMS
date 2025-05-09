const mongoose = require("mongoose");
const staffDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desgn: {
    type: String,
    required: true,
  },
  experince: {
    type: String,
    required: true,
  },
  quali: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const StaffModule = mongoose.model("staffDetails", staffDetailsSchema);
module.exports = StaffModule;
