exports.signup_get = function (req, res, next) {
  res.render("signup_form", {
    title: "Sign up for AnonChat",
  });
};

exports.signup_post = function (req, res, next) {
  res.send("This page implements signup post request.");
};
