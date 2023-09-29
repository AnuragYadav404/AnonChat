const connection = require("../config/db_connection");
const Message = connection.models.Message;
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    .sort({ createdAt: -1 });
  return res.render("chat", {
    title: "Anon Chat Space",
    messages,
    user: req.user,
  });
});

// this handles chat post request
exports.chat_post = [
  body(
    "content",
    "Your message should be less than 1800 characters and must contain atleast 1 charcter."
  )
    .trim()
    .isLength({ min: 1, max: 1800 })
    .escape(),
  asyncHandler(async function (req, res, next) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const messages = await Message.find()
        .populate("anon_user")
        .sort({ createdAt: 1 });
      return res.render("chat", {
        title: "Anon Chat Space",
        messages,
        user: req.user,
        errors: error.array(),
      });
    } else {
      if (req.user) {
        const newMessage = new Message({
          content: req.body.content,
          anon_user: req.user,
        });
        await newMessage.save();
        return res.redirect("/chat");
      } else {
        return res.redirect("/login");
      }
    }
  }),
];
