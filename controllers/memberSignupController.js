const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const connection = require("../config/db_connection");
const AnonUser = connection.models.AnonUser;

exports.memberSignup_get = function (req, res, next) {
  // here it has the simple thing of handling of display memeber form
  res.render("member_form", {
    title: "Sign up as a member now!",
  });
};
// abra cada bra
exports.memberSignup_post = [
  body("memberphrase", "Member phrase was invalid!!!")
    .trim()
    .isLength({ min: 11, max: 11 })
    .escape(),
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("member_form", {
        title: "Sign up as a member now!",
        errors: errors.array(),
      });
    } else {
      if (req.user) {
        if (!req.user.isMember) {
          const anonUser = await AnonUser.findById(req.user.id).exec();
          anonUser.isMember = true;
          await anonUser.save();
          res.redirect("/chat");
        } else {
          res.redirect("/");
        }
      } else {
        res.render("member_form", {
          title: "Sign up as a member now!",
          errors: [{ msg: "You are currently logged out" }],
        });
      }
    }
  }),
];
