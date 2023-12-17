const express = require("express");
const router = express.Router();
const passport = require("../../../passport/passport");

// import controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.get("/", passport.authenticate('jwt', { session: false }), shoesController.index);
router.delete("/:id", passport.authenticate('jwt', { session: false }), shoesController.cancel);
router.patch("/:id", passport.authenticate('jwt', { session: false }), shoesController.orderStatus);
router.patch("/payment/:id", shoesController.paymentStatus);
router.get("/status/:id", shoesController.showStatus);
router.get("/:id", shoesController.showShoe);
router.post("/", shoesController.create);

module.exports = router;