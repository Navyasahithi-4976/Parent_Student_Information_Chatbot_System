const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  cgpa: Number,
  attendance: Number,
  feesStatus: String,
  backlogs: Number
});

module.exports = mongoose.model("Student", studentSchema);