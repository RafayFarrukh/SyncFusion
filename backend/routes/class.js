var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const Class = require("../models/Class");
const Attendance = require("../models/Attendance");
router.post("/addClass", async function (req, res, next) {
  try {
    const id = req.user._id;
    const courseCode = req.body.courseCode;
    const teacher = await Teacher.findById(id);
    const course = await Course.findOne({
      courseCode: courseCode,
    });
    console.log(course);
    if (!course)
      return res.status(401).json({
        message: "Course does not exist",
        success: false,
      });
    const newClass = new Class({
      ...req.body,
      course,
    });

    const class_ = await newClass.save();
    class_.teacher = teacher;
    class_.Course = course;
    await class_.save();
    res.status(200).json({
      message: "Class successfully created",
      class_,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/addStudents/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const classInfo = await Class.findById(id).exec();
    const studentsArray = classInfo.students;
    const { username } = req.body;
    const students = await User.find({
      email: { $regex: username, $options: "i" },
    });
    students.forEach((student) => {
      studentsArray.push(student._id);
      // student.students.push(new Date().toISOString());
      student.save();
    });
    console.log(classInfo);
    await classInfo.save();
    res.status(200).json({
      message: "Name successfully updated",
      classInfo,
    });
  } catch (error) {}
});
router.get(
  "/takeAttendence/:classId/students/:studentId/attendance",
  async function (req, res, next) {
    try {
      // Find the class by ID
      const classId = req.params.classId;
      const classInfo = await Class.findById(classId).exec();

      // Make sure the class exists
      if (!classInfo) {
        return res.status(404).json({ message: "Class not found" });
      }

      // Find the student by ID
      const student = await User.findById(req.params.studentId).exec();

      // Make sure the student exists
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Check if the student is enrolled in the class

      // Check if student is enrolled in class
      let enrolled = false;
      for (let i = 0; i < classInfo.students.length; i++) {
        if (classInfo.students[i]._id.toString() === student._id.toString()) {
          enrolled = true;
          break;
        }
      }

      if (!enrolled) {
        return (
          res
            // .status(400).
            .json({
              message: "Student is not enrolled in the class",
              success: false,
            })
        );
      }
      // if (!classInfo.students.includes(student._id)) {
      //   return res
      //     .status(400)
      //     .json({ message: "Student is not enrolled in the class" });
      // }

      // Check if attendance has already been marked for the student on the current date
      const today = new Date().toISOString().slice(0, 10);
      const existingAttendance = await Attendance.findOne({
        classInfoId: classInfo._id,
        studentId: student.stdId,
        date: today,
      });
      if (existingAttendance) {
        return (
          res
            // .status(400).
            .json({
              message:
                "Attendance has already been marked for this student on the current date",
              success: false,
            })
        );
      }

      // Create new attendance record for the student in the classInfo
      const newAttendance = new Attendance({
        ClassId: classInfo._id,
        stdId: student.stdId,
        date: today,
      });

      await newAttendance.save();

      return res.status(200).json({
        message: "Attendance marked successfully",
        newAttendance,
        success: true,
      });
    } catch (err) {
      // console.error(err);
      // res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
