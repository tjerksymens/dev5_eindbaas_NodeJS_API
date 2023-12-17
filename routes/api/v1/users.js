const express = require("express");
const router = express.Router();
const passport = require("../../../passport/passport");

// import controller
const usersController = require("../../../controllers/api/v1/users");

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.post('/change-password', usersController.changePassword);
router.get('/check-admin/:token', passport.authenticate('jwt', { session: false }), usersController.checkAdmin);
router.get('/:token', passport.authenticate('jwt', { session: false }), usersController.getUser);

module.exports = router;