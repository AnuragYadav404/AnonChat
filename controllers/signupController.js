const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const connection = require("../config/db_connection");
const AnonUser = connection.models.AnonUser;
const genPassword = require("../lib/passwordUtils").genPassword;
require("dotenv").config();

exports.signup_get = function (req, res, next) {
  res.render("signup_form", {
    title: "Sign up for AnonChat",
  });
};

// this controller now needs to be implemented well. series of
// validations need to be done

exports.signup_post = [
  body(
    "username",
    "Username must be atleast 3 characters long and less than 16 characters."
  )
    .trim()
    .isLength({ min: 3, max: 16 })
    .escape(),
  body(
    "password",
    "Password must be atleast 8 characters long and less than 16 characters."
  )
    .trim()
    .isLength({ min: 8, max: 16 })
    .escape(),
  body("modpass")
    .trim()
    .escape()
    .optional({ values: "falsy" })
    .equals(process.env.MODPASS)
    .withMessage("Moderator password is incorrect."),
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup_form", {
        title: "Sign up for AnonChat",
        errors: errors.array(),
      });
    } else {
      // here i will also have to check whether this username is in use or not
      const existUser = await AnonUser.findOne({
        username: req.body.username,
      }).exec();
      if (existUser) {
        console.log("user exists");
        return res.render("signup_form", {
          title: "Sign up for AnonChat",
          errors: [
            { msg: "Username already in use, choose some other username." },
          ],
        });
      } else {
        console.log("creating user");
        const { salt, hash } = genPassword(req.body.password);
        const newUser = new AnonUser({
          username: req.body.username,
          salt: salt,
          hash: hash,
        });
        if (req.body.modpass) {
          newUser.isModerator = true;
        }
        await newUser.save();
        console.log("user created");
        return res.redirect("/login");
      }
    }
  }),
];
