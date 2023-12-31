const express = require("express");
const router = express.Router();
const passport = require("../../../passport/passport");
const cors = require("cors");

// import controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.use(cors());
router.get("/", shoesController.index);
router.delete("/:id", passport.authenticate('jwt', { session: false }), shoesController.cancel);
router.patch("/:id", passport.authenticate('jwt', { session: false }), shoesController.orderStatus);
router.patch("/payment/:id", shoesController.paymentStatus);
router.get("/:id", shoesController.showShoe);
router.post("/:token", passport.authenticate('jwt', { session: false }), shoesController.create);

module.exports = router;