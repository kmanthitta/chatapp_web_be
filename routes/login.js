const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, pwd } = req.body;
  const result = await User.findOne({ email: email });
  if (result) {
    if (result.pwd !== pwd) {
      res.status(401).send("Invalid password");
    } else {
      res.send({ message: "User created", id: result._id });
    }
  } else {
    res.status(500).send("User not found");
  }
});

module.exports = router;
