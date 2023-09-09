const { Schema, model } = require("mongoose");
const User = require("./User");
var ObjectId = Schema.ObjectId;

const ChatRoom = new Schema(
  {
    name: String,
    type: String,
    participants: {
      type: [ObjectId],
      ref: "User",
    },
    pings: {
      type: [
        new Schema(
          {
            author: { type: ObjectId, ref: "User" },
            message: String,
          },
          { timestamps: true }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model("ChatRoom", ChatRoom);
