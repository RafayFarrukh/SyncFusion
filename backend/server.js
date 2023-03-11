const express = require("express");
const app = express();
const apiauth = require("./middlewares/apiauth");
//auth
const user = require("./routes/auth/user");
const teacher = require("./routes/auth/teacherAuth");
//course
const teacher_course = require("./routes/course/teacher_course");
const student_course = require("./routes/course/student_course");
const StudentClass = require("./routes/class");

const dbConnect = require("./db/db-connect.js");
const cors = require("cors");
app.use(cors());

//vercel

//

app.use(express.json());

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("welcome to backend of Qr code");
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// auth
app.use("/api/auth/user", user);
app.use("/api/auth/teacher", teacher);
//course
app.use("/api/course/teacher", apiauth, teacher_course);
app.use("/api/course/student", apiauth, student_course);
app.use("/api/class/teacher", StudentClass);

const server = async () => {
  try {
    await dbConnect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
server();
