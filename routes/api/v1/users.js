const express = require("express");
const router = express.Router();

// import controller
const usersController = require("../../../controllers/api/v1/users");

router.post('/signup', usersController.signup);

module.exports = router;