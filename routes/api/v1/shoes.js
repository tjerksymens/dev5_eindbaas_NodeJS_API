const express = require("express");
const router = express.Router();

// import controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.get("/", shoesController.index);
router.post("/", shoesController.create);

module.exports = router;