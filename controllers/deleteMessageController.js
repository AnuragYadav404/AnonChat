const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const connection = require("../config/db_connection");
const Message = connection.models.Message;

exports.delete_post = asyncHandler(async function (req, res, next) {
  await Message.findByIdAndRemove(req.body.messageid);
  return res.redirect("/chat");
});
