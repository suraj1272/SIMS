const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  usn: { type: String, required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
  examType: { type: String, required: true },
});

module.exports = mongoose.model("Marks", MarksSchema);
