const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user");

// Signup Routes
router.get("/signup", userController.renderSignupForm);
router.post("/signup", userController.signupUser);

// Login Routes
router.get("/login", userController.renderLoginForm);
router.post("/login", userController.loginUser);

// Logout Route
router.get("/logout", userController.logoutUser);

module.exports = router;
