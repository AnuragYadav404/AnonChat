const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const chatController = require("../controllers/chatController");
const logoutController = require("../controllers/logoutController");

/* GET home page. */
router.get("/", homeController.homepage_get);

router.get("/signup", signupController.signup_get);

router.post("/signup", signupController.signup_post);

router.get("/login", loginController.login_get);

router.post("/login", loginController.login_post);

router.post("/logout", logoutController.logout_post);
//\n It display all the messages, login button, sign up button.\n This page also presents a message form if the user is authenticated.

router.get("/chat", chatController.chat_get);

router.post("/chat", chatController.chat_post);

module.exports = router;
