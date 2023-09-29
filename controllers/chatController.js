const connection = require("../config/db_connection");
const Message = connection.models.Message;
const asyncHandler = require("async-handler");

exports.chat_get = asyncHandler(async function (req, res, next) {
  // this will require database query operations
  // const messages = await Message.find().populate("anon_user");
  // here i will have to sort the messages in decreasing order of the date
  // also i will have to attach {user: req.user} to display user specific info
  // user specific info will not display login and signup buttons
  // instead it will show logout
  // user specific info will also decide on display of message field

  const messages = await Message.find()
    .populate("anon_user")
    .sort({ createdAt: 1 });

  return res.render("chat", {
    title: "Anon Chat Space",
    messages,
    user: req.user,
  });

  res.send("This implements the chat get.");
});

exports.chat_post = function (req, res, next) {
  // this handles chat post request
  res.send("This handles the chat's message post.");
};
