const express = require("express");
const router = express.Router();
const passport = require("passport");

//import the user controller
const userController = require("../controller/user");

const quotationController = require("../controller/quotations");

// api
router.post("/sign-up", userController.signUp);

router.post("/sign-in", userController.signIn);

router.post(
  "/create-quotation",
  passport.authenticate("jwt", { session: false }),
  quotationController.createQuotation
);

router.get(
  "/quotations",
  passport.authenticate("jwt", { session: false }),
  quotationController.getAllQuotations
);

router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.userDetails
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/success",
  passport.authenticate("google", { failure: "/error", session: false }),
  userController.successfullySignedIn
);

module.exports = router;
