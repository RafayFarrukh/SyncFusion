const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  stdId: {
    type: String,
    unique: true,
    // required: "Your student id is required",
  },
  email: {
    type: String,
    unique: true,
    required: "Your email is required",
    trim: true,
  },
  password: {
    type: String,
    required: "Your password is required",
    max: 50,
  },
  fullName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  studentImage: {
    imageByte: {
      type: Buffer,
    },
    fileType: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Student", StudentSchema);
