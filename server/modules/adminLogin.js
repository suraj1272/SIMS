const mongoose = require("mongoose");
const adminLoginSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const adminLoginModule = mongoose.model("adminLogin", adminLoginSchema);
module.exports = adminLoginModule;
