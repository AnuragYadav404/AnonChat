const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(
    "This page implements the homepage.\n It display all the messages, login button, sign up button.\n This page also presents a message form if the user is authenticated."
  );
});

router.get("/signup", function (req, res, next) {
  res.send("This page implements and renders sign-up form.");
});

router.post("/signup", function (req, res, next) {
  res.send("This page implements signup post request.");
});

router.get("/login", function (req, res, next) {
  res.send("This page implements and renders login form.");
});

router.post("/login", function (req, res, next) {
  res.send("This page implements login post request.");
});

router.post("/message", function (req, res, next) {
  res.send("This route handles the message post request by a user");
});

module.exports = router;
