const mongoose = require("mongoose");
const addAtdSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  sem: { type: Number, required: true },
  div: { type: String, required: true },
  subject: { type: String, required: true },
  students: [
    {
      usn: { type: String, required: true },
      name: { type: String, required: true },
      status: { type: String, enum: ["Present", "Absent"], required: true },
    },
  ],
});
const addAtdModule = mongoose.model("addAtd", addAtdSchema);
module.exports = addAtdModule;
