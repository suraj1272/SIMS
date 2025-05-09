const mongoose = require("mongoose");
const subAddSchema = new mongoose.Schema({
  subTitle: {
    type: String,
    required: true,
  },
  subCode: {
    type: String,
    required: true,
  },
});
const AddSubModule = mongoose.model("addSub", subAddSchema);
module.exports = AddSubModule;
