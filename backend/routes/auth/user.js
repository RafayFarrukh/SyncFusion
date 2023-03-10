var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/register", async function (req, res, next) {
  const { fullName, email, password, stdId, imageUrl, studentImage } = req.body;
  if (!email || !password || !fullName) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({
          error: "User Already Exists",
          success: false,
        });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          fullName,
          email,
          password: hashedpassword,
          stdId,
          imageUrl,
          studentImage,
        });

        user
          .save()
          .then((user) => {
            res.json({ user });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    res
      // .status(404)
      .json({ error: "User Dont Exists", success: false });
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return (
        res
          // .status(404)
          .json({ error: "Invalid Password", success: false })
      );
    }
    const token = jwt.sign(
      {
        _id: user._id,
        stdId: user.stdId,
        fullName: user.fullName,

        email: user.email,
      },
      config.get("jwtPrivateKey")
    );
    const { _id, fullName, email, stdId } = user;

    res
      .status(201)
      .json({ user: { _id, fullName, email, stdId }, token, success: true });
  }
});
module.exports = router;
