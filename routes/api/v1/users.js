const express = require("express");
const router = express.Router();
const passport = require("../../../passport/passport");

// import controller
const usersController = require("../../../controllers/api/v1/users");

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.post('/change-password', usersController.changePassword);

module.exports = router;