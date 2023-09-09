const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const result = await User.findOne({ email: req.body.email });
  if (result) {
    res.status(500).send("User with email already exists");
  } else {
    const { name, email, pwd } = req.body;
    const newUser = new User({ name, email, pwd });
    newUser
      .save()
      .then((user) => res.send({ message: "User created", id: user._id }))
      .catch((error) => res.send(error));
  }
});

module.exports = router;
