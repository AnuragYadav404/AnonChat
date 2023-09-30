const mongoose = require("mongoose");
const connection = require("../config/db_connection");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const messageSchema = new Schema({
  content: { type: String, required: true, maxLength: 2000 },
  anon_user: { type: Schema.Types.ObjectId, ref: "AnonUser", required: true },
  createdAt: { type: Date, default: Date.now() },
});

messageSchema.virtual("createdAt_formatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString({
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
});

const Message = connection.model("Message", messageSchema);

module.exports = Message;
