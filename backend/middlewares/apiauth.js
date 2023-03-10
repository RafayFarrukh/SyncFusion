const jwt = require("jsonwebtoken");
const config = require("config");
// const db = require('../models')
// const User = db.User

async function apiauth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    console.log(decoded.userID);

    // const user = await User.findOne(decoded._id).select("-password");
    // if (!user) return res.status(400).send("Invalid token: User Dont exist");
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong at server");
  }
}

module.exports = apiauth;
