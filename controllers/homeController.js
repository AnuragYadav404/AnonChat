exports.homepage_get = function (req, res, next) {
  res.render("homepage", {
    title: "Welcome to Anon-Chat",
  });
};
