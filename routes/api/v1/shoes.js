const express = require("express");
const router = express.Router();

// import controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.get("/", shoesController.index);
router.delete("/:id", shoesController.cancel);
router.patch("/:id", shoesController.orderStatus);
router.patch("/payment/:id", shoesController.paymentStatus);
router.get("/status/:id", shoesController.showStatus);
router.get("/:id", shoesController.showShoe);
router.post("/", shoesController.create);

module.exports = router;