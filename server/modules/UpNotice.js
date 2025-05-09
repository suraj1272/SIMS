const mongoose = require("mongoose");
const upNoticeSchema = new mongoose.Schema({
  no: Number,
  title: String,
});
const upNoticeModule = mongoose.model("upNotice", upNoticeSchema);
module.exports = upNoticeModule;
