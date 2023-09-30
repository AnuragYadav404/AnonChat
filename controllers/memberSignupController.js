exports.memberSignup_get = function (req, res, next) {
  // here it has the simple thing of handling of display memeber form
  res.render("member_form", {
    title: "Sign up as a member now!",
  });
};

exports.memberSignup_post = function (req, res, next) {
  res.send("This handles/implements member sign up post");
};
