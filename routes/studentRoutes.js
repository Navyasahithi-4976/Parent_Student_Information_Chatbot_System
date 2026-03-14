const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// Get complete student details
router.get("/student", async (req, res) => {
  try {
    const student = await Student.findOne();
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get CGPA
router.get("/cgpa", async (req, res) => {
  try {
    const student = await Student.findOne();
    res.json({ cgpa: student?.cgpa });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get Attendance
router.get("/attendance", async (req, res) => {
  try {
    const student = await Student.findOne();
    res.json({ attendance: student?.attendance });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get Fees Status
router.get("/fees", async (req, res) => {
  try {
    const student = await Student.findOne();
    res.json({ feesStatus: student?.feesStatus });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get Backlogs
router.get("/backlogs", async (req, res) => {
  try {
    const student = await Student.findOne();
    res.json({ backlogs: student?.backlogs });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;