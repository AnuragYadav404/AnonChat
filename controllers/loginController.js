exports.login_get = function (req, res, next) {
  res.render("login_form", {
    title: "Login to Anon Chat",
  });
};

exports.login_post = function (req, res, next) {
  // this function will basically never run
  // on authentication, we will use success_redirect
  // and failure_redirect for login
  res.send("This page implements login post request.");
};
