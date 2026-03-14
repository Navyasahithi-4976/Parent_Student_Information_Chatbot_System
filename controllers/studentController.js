const Student = require("../models/student");

exports.getStudent = async (req, res) => {
  const student = await Student.findOne();
  res.json(student);
};

exports.getCGPA = async (req, res) => {
  const student = await Student.findOne();
  res.json({ cgpa: student.cgpa });
};

exports.getAttendance = async (req, res) => {
  const student = await Student.findOne();
  res.json({ attendance: student.attendance });
};

exports.getFees = async (req, res) => {
  const student = await Student.findOne();
  res.json({ feesStatus: student.feesStatus });
};

exports.getBacklogs = async (req, res) => {
  const student = await Student.findOne();
  res.json({ backlogs: student.backlogs });
};