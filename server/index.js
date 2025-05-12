const mongoose = require("mongoose");
const express = require("express");
const StdModel = require("./modules/StdDetails");
const adminLoginModule = require("./modules/adminLogin");
const StaffModule = require("./modules/StaffDetails");
const addSubModule = require("./modules/AddSub");
const upNoticeModule = require("./modules/UpNotice");
const axios = require("axios");
const multer = require("multer");
const QuestionPaper = require("./modules/UpQp");
const App = express();
const cors = require("cors");
const MarksModule = require("./modules/Marks");

const addAtdModule = require("./modules/AddAtd");
App.use(cors());
App.use(express.json());
App.use("/uploads", express.static("uploads"));
const jwt = require("jsonwebtoken");
const SECRET_KEY = "google";

mongoose
  .connect("mongodb://localhost:27017/SIMS")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
//admin login
App.post("/adminLogin", (req, res) => {
  const { email, password } = req.body;

  adminLoginModule.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ id: user._id, role: "admin" }, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});
// token verification
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

App.get("/adminHome", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  res.status(200).json({ message: "Welcome to the admin dashboard" });
});
//staff login
App.post("/staffLogin", (req, res) => {
  const { email, password } = req.body;

  StaffModule.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ id: user._id, role: "staff" }, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Login successful", token }); // Include the token in the response
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

App.get("/staffHome", verifyToken, (req, res) => {
  if (req.user.role !== "staff") {
    return res.status(403).json({ error: "Access denied" });
  }

  res.status(200).json({ message: "Welcome to the staff dashboard" });
});
//student login
App.post("/studentLogin", (req, res) => {
  const { usn, password } = req.body;

  StdModel.findOne({ usn: usn }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ id: user._id, role: "student" }, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Login successful", token }); // Include the token in the response
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});
App.get("/studentHome", verifyToken, (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: "Access denied" });
  }

  res.status(200).json({ message: "Welcome to the student dashboard" });
});
//admin adding student details
App.post("/stdDetails", (req, res) => {
  StdModel.create(req.body)
    .then((StdDetails) => res.json(StdDetails))
    .catch((err) => res.json(err));
});
//admin adding staff details
App.post("/staffDetails", (req, res) => {
  StaffModule.create(req.body)
    .then((StaffDetails) => res.json(StaffDetails))
    .catch((err) => err.json(err));
});
//admin adding sub details
App.post("/addSub", (req, res) => {
  addSubModule
    .create(req.body)
    .then((addSub) => res.json(addSub))
    .catch((err) => res.json(err));
});
//staff uploding attendance
App.post("/uplodAtd", (req, res) => {
  const { sem, div, students, subject } = req.body;
  addAtdModule
    .create({ sem, div, students, subject })
    .then((addAtd) => res.status(201).json(addAtd))
    .catch((err) =>
      res.status(500).json({ error: "Failed to save attendance", details: err })
    );
});
//staff uploading notice
App.post("/upNotice", (req, res) => {
  upNoticeModule
    .create(req.body)
    .then((upNotice) => res.json(upNotice))
    .catch((err) => res.json(err));
});
//fetching sstudent details for attendance
App.get("/getStudentsBySemAndDiv", async (req, res) => {
  const { sem, div } = req.query;
  try {
    const students = await StdModel.find({ sem, div });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students", details: err });
  }
});
//admin viewing student details
App.get("/viewStudent", async (req, res) => {
  try {
    const students = await StdModel.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//admin viewing staff details
App.get("/viewStaff", async (req, res) => {
  try {
    const staff = await StaffModule.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// admin viewing subject details
App.get("/viewSub", async (req, res) => {
  try {
    const subjects = await addSubModule.find();
    res.status(200).json(subjects);
  } catch (err) {
    req.status(500).json({ error: err.message });
  }
});
//staff uploding question paper
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
App.post("/upQp", upload.single("file"), async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    const questionPaper = new QuestionPaper({
      title,
      filepath: file.path,
    });

    await questionPaper.save();
    res
      .status(201)
      .json({ message: "Question paper uploaded successfully", questionPaper });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to upload question paper", details: error });
  }
});
//student viewing attendance by there usn
App.get("/getAttendanceByUsn", async (req, res) => {
  const { usn } = req.query;

  try {
    const attendance = await addAtdModule.find({ "students.usn": usn });
    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch attendance", details: err });
  }
});
//student viewing notice
App.get("/viewNotice", async (req, res) => {
  try {
    const notice = await upNoticeModule.find();
    res.status(200).json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//student viewing question paper
App.get("/getAllQp", async (req, res) => {
  try {
    const questionPapers = await QuestionPaper.find();
    res.status(200).json(questionPapers);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch question papers", details: err });
  }
});
//staff deleting notice
App.delete("/deleteNotice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await upNoticeModule.findByIdAndDelete(id); // Delete the notice by ID
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notice", details: err });
  }
});

//staff updating notice
App.put("/updateNotice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { no, title } = req.body;
    const updatedNotice = await upNoticeModule.findByIdAndUpdate(
      id,
      { no, title },
      { new: true }
    );
    res.status(200).json(updatedNotice);
  } catch (err) {
    res.status(500).json({ error: "Failed to update notice", details: err });
  }
});
//admin updating student details
App.put("/updateStudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedStudent = await StdModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update student", details: err });
  }
});

//admin deleting student details
App.delete("/deleteStudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await StdModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student", details: err });
  }
});
//admin deleting subject details
App.delete("/deleteSub/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await addSubModule.findByIdAndDelete(id);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete subject", details: err });
  }
});
//admin updating subject details
App.put("/updateSub/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedSubject = await addSubModule.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );
    res.status(200).json(updatedSubject);
  } catch (err) {
    res.status(500).json({ error: "Failed to update subject", details: err });
  }
});

App.delete("/deleteSub/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await addSubModule.findByIdAndDelete(id);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete subject", details: err });
  }
});

//admin deleting staff details
App.delete("/deleteStaff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await StaffModule.findByIdAndDelete(id);
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete staff", details: err });
  }
});

//admin updating staff details
App.put("/updateStaff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedStaff = await StaffModule.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedStaff);
  } catch (err) {
    res.status(500).json({ error: "Failed to update staff", details: err });
  }
});
//staff uploading marks
App.post("/addMarks", async (req, res) => {
  try {
    const { marksData } = req.body; // Array of marks data
    const newMarks = await MarksModule.insertMany(marksData);
    res.status(201).json(newMarks);
  } catch (err) {
    res.status(500).json({ error: "Failed to add marks", details: err });
  }
});
//student viewing marks
App.get("/getMarks/:usn", async (req, res) => {
  try {
    const { usn } = req.params;
    const marks = await MarksModule.find({ usn });
    res.status(200).json(marks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch marks", details: err });
  }
});
App.post("/addMarks", async (req, res) => {
  try {
    const { usn, subject, marks, examType } = req.body;
    const newMarks = await MarksModule.create({
      usn,
      subject,
      marks,
      examType,
    });
    res.status(201).json(newMarks);
  } catch (err) {
    res.status(500).json({ error: "Failed to add marks", details: err });
  }
});
//staff finding students by sem and div in staff portal
App.get("/getStudentsBySemAndDiv", async (req, res) => {
  const { sem, div } = req.query;
  try {
    const students = await StdModel.find({ sem, div });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students", details: err });
  }
});
//staff getting subjects to upload marks
App.get("/getSubjects", async (req, res) => {
  try {
    const subjects = await addSubModule.find();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subjects", details: err });
  }
});

App.listen(5000, () => {
  console.log("Server is running on port 5000");
});
