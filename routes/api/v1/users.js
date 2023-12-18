const express = require("express");
const router = express.Router();
const passport = require("../../../passport/passport");
const cors = require("cors");

// import controller
const usersController = require("../../../controllers/api/v1/users");

router.use(cors());
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.post('/change-password', usersController.changePassword);
router.get('/check-admin/:token', passport.authenticate('jwt', { session: false }), usersController.checkAdmin);
router.get('/getUser', passport.authenticate('jwt', { session: false }), usersController.getUser);
router.get('/costumer/:id', usersController.getCostumer);

module.exports = router;