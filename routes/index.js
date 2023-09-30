const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const chatController = require("../controllers/chatController");
const logoutController = require("../controllers/logoutController");
const passport = require("passport");
const memberSignupController = require("../controllers/memberSignupController");
const deleteMessageController = require("../controllers/deleteMessageController");
/* GET home page. */
router.get("/", homeController.homepage_get);

router.get(
  "/signup",
  function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.render("logged_in");
    }
    next();
  },
  signupController.signup_get
);

router.post(
  "/signup",
  function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.render("logged_in");
    }
    next();
  },
  signupController.signup_post
);

router.get(
  "/login",
  function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/chat");
    }
    next();
  },
  loginController.login_get
);

// here login_post should never be reached, instead it must be handled
// via authenticate
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/chat",
  })
);

router.get(
  "/logout",
  function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  },
  logoutController.logout_get
);

router.post(
  "/logout",
  function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  },
  logoutController.logout_post
);
//\n It display all the messages, login button, sign up button.\n This page also presents a message form if the user is authenticated.

router.get("/chat", chatController.chat_get);

router.post(
  "/chat",
  function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  },
  chatController.chat_post
);

router.get("/home", (req, res, next) => {
  return res.redirect("/");
});

router.get(
  "/member_signup",
  function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  },
  memberSignupController.memberSignup_get
);
router.post(
  "/member_signup",
  function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  },
  memberSignupController.memberSignup_post
);

router.post(
  "/deleteMessage",
  function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    } else if (!req.user.isModerator) {
      return res.render("escape_matrix");
    }
    next();
  },
  deleteMessageController.delete_post
);
// this is some dummy thing, will be removed at some time
router.use("/:dummy", (req, res, next) => {
  res.render("escape_matrix");
});

module.exports = router;
