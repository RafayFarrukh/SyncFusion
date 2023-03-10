var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const Teacher = require("../../models/Teacher");
const Course = require("../../models/Course");
const Class = require("../../models/Class");

router.post("/joinCourse", async function (req, res, next) {
  try {
    const courseCode = req.body.courseCode;
    const id = req.user._id;
    const student = await User.findById(id);
    const course = await Class.findOne({
      courseCode: courseCode,
    });
    console.log(course.Course.courseCode);
    if (course.Course.courseCode !== courseCode)
      return res.status(401).json({
        message: "Course does not exist",
        success: false,
      });

    const attendanceArray = course.attendance;
    const studentAlreadyIn = await course.students.find((s) => s.id === id);

    for (let i = 0; i < attendanceArray.length; i++) {
      var studentInAttendanceArray = await attendanceArray[i].students.find(
        (student) => student.id === id
      );
    }

    if (studentAlreadyIn || studentInAttendanceArray) {
      return res.status(401).json({
        message: "You have already enrolled this course",
        success: false,
      });
    }

    await course.students.push(student);

    for (let i = 0; i < attendanceArray.length; i++) {
      attendanceArray[i].students.push(student);
    }

    await course.save();

    res.status(200).json({
      course,
      message: "Successfully joined the course",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//leave course api

// showcourselist
router.get("/showCourseList", async function (req, res, next) {
  try {
    const studentId = req.user._id;

    let courseList = await Course.find({
      "students._id": studentId,
    }).exec();

    if (!courseList)
      return res.status(401).json({
        message: "Course list does not exist",
      });

    res.status(200).json({
      courseList,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
