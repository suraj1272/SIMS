const mongoose = require("mongoose");
const QuestionPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  filepath: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});
const QuestionPaper = mongoose.model("QuestionPaper", QuestionPaperSchema);
module.exports = QuestionPaper;
