exports.chat_get = function (req, res, next) {
  // this will require database query operations
  res.send("This implements the chat get.");
};

exports.chat_post = function (req, res, next) {
  res.send("This handles the chat's message post.");
};
