const express = require("express");
const ChatRoom = require("../models/ChatRoom");
const router = express.Router();
const { Types } = require("mongoose");
var ObjectId = Types.ObjectId;

router.get("/chat", async (req, res, next) => {
  const userId = req.query.userId;
  console.log(userId);
  const result = await ChatRoom.find({
    participants: new ObjectId(userId),
  });

  res.send(result);
});

module.exports = router;
