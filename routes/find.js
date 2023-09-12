const express = require("express");
const ChatRoom = require("../models/ChatRoom");
const router = express.Router();
const { Types } = require("mongoose");
const User = require("../models/User");
const { createDMChat } = require("./chat");
var ObjectId = Types.ObjectId;

router.get("/mychats", async (req, res, next) => {
  const userId = req.query.userId;

  const result = await ChatRoom.find({
    participants: new ObjectId(userId),
  })
    .populate("participants");

  res.send(result);
});

router.get("/chat", async (req, res, next) => {
  const userId = req.query.userId;
  const withUserId = req.query.withUserId;

  const result = await ChatRoom.find({
    $and: [
      {
        participants: new ObjectId(userId),
      },
      { participants: new ObjectId(withUserId) },
    ],
  })
    .populate("participants");

  if (result.length === 0) {
    let createResult = await createDMChat(userId, withUserId);
    const newChat = await ChatRoom.findById(new ObjectId(createResult._id))
      .populate("participants");
    res.send(newChat);
  } else {
    res.send(result[0]);
  }
});

router.get("/users", async (req, res, next) => {
  const name = req.query.name;
  const userId = req.query.myId;
  const result = await User.find({
    name: { $regex: name, $options: "i" },
    _id: { $ne: userId },
  }).select("name _id email");
  res.send(result);
});

module.exports = router;
