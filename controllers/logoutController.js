exports.logout_get = function (req, res, next) {
  res.render("logout_form", {
    title: "Are you sure u want to logout?",
  });
};

exports.logout_post = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
