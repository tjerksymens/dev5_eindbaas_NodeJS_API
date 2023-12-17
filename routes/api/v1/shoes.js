const express = require("express");
const router = express.Router();

// import controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.get("/", shoesController.index);
router.delete("/:id", shoesController.cancel);
router.put("/:id", shoesController.orderStatus);
router.put("/payment/:id", shoesController.paymentStatus);
router.get("/status/:id", shoesController.showStatus);
router.get("/:id", shoesController.showShoe);
router.post("/", shoesController.create);

module.exports = router;