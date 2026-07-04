const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/review");

// ========== AUTH MIDDLEWARE ==========
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }
  next();
}

// ========== REVIEW ROUTES ==========

// Create a review (only for logged-in users)
router.post("/", isLoggedIn, reviewController.createReview);

// Delete a review (only for logged-in users)
router.delete("/:reviewId", isLoggedIn, reviewController.deleteReview);

module.exports = router;
