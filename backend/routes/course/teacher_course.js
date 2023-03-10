var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const Teacher = require("../../models/Teacher");
const Course = require("../../models/Course");
const Class = require("../../models/Class");

router.post("/addCourse", async function (req, res, next) {
  try {
    // const id = req.user._id;
    // const teacher = await Teacher.findById(id);
    const newCourse = new Course({
      ...req.body,
    });

    const course_ = await newCourse.save();
    // course_.teacher = teacher;

    await course_.save();
    res.status(200).json({
      message: "Course successfully created",
      course_,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/deleteCourse/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    await Course.findByIdAndDelete(id);

    res.status(200).json({
      message: "Course has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// show one course
router.get("/showOneCourse/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);

    if (!course)
      return res.status(401).json({
        message: "Course does not exist",
      });

    res.status(200).json({
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//show all courses
router.get("/showAllCourses", async function (req, res, next) {
  try {
    const teacherId = req.user._id;
    console.log(teacherId);
    let courseList = await Class.find({
      teacherId,
    })
      .populate("Course._id")
      .exec();
    // console.log(courseList.Course);
    console.log(courseList.map((course) => course.Course));
    // console.log(courseList.map((e)
    // =>e.teacher
    // ));
    if (!courseList)
      return res.status(401).json({
        message: "Teacher is not teaching this class",
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
//  Add course schedule
router.post("/addCourseSchedule", async function (req, res, next) {
  try {
    const id = req.params.id;
    let courseStartDate = req.body.courseStartDate; //20.10.2021
    let courseEndDate = req.body.courseEndDate; //20.10.2021
    let courseTime = req.body.courseTime; //09:00-12:00
    const currentCourse = await Course.findById(id);

    if (!currentCourse)
      res.status(401).json({
        message: "Course does not exist",
      });

    let courseScheduleArray = [];
    let timeArray = [];
    let dateArray = [];

    let startDate = moment(courseStartDate, "DD-MM-YYYY");
    let endDate = moment(courseEndDate, "DD-MM-YYYY");

    while (startDate <= endDate) {
      dateArray.push(moment(startDate).format("DD-MM-YYYY"));
      timeArray.push(courseTime);
      startDate = moment(startDate).add(7, "days");
    }

    for (let i = 0; i < dateArray.length; i++) {
      courseScheduleArray[i] = {};
      courseScheduleArray[i].date = dateArray[i];
      courseScheduleArray[i].time = timeArray[i];
    }

    currentCourse.attendance = courseScheduleArray;
    await currentCourse.save();

    res.status(200).json({
      message: "Course schedule successfully added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
