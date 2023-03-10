const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema({
  Course: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  teacher: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  students: [
    {
      stdId: {
        type: String,
        ref: "Student",
      },
    },
  ],
  // attendance: [
  //   {
  //     stdId: {
  //       type: String,
  //       ref: "Student",
  //     },
  //     date: {
  //       type: Date,
  //       required: true,
  //       default: Date.now,
  //     },

  //     time: {
  //       type: String,
  //       required: true,
  //       // default: Time.now,
  //       // default: "0",
  //     },
  //     ClassId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //       ref: "Class",
  //     },
  //     // students: [
  //     //   {
  //     //     stdId: {
  //     //       type: String,
  //     //       ref: "Student",
  //     //     },

  //     //     attendanceStatus: {
  //     //       type: Boolean,
  //     //       default: false,
  //     //     },
  //     //   },
  //     // ],
  //   },
  // ],
});

module.exports = mongoose.model("Class", ClassSchema);
