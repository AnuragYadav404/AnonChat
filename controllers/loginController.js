exports.login_get = function (req, res, next) {
  res.render("login_form", {
    title: "Login to Anon Chat",
  });
};

exports.login_post = function (req, res, next) {
  res.send("This page implements login post request.");
};
