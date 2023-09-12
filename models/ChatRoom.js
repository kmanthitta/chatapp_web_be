const { Schema, model } = require("mongoose");
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
            author: String,
            message: String,
          },
          { timestamps: true }
        ),
      ],
      default: [],
    },
    latestPing: {
      type: new Schema(
        {
          author: String,
          message: String,
        },
        { timestamps: true }
      ),
    },
    read: [
      {
        participantId: String,
        readNotificationCount: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("ChatRoom", ChatRoom);
