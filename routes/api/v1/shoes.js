const express = require("express");
const router = express.Router();

// import controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.get("/", shoesController.index);
router.get("/:id", shoesController.showShoe);
router.post("/", shoesController.create);

module.exports = router;