const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
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
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
