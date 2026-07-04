const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

const listingController = require("../controllers/listing");
const Listing = require("../models/listing");

// ============================
//     AUTH + AUTHZ MIDDLEWARE
// ============================

// Check if user is logged in
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }
  next();
}

// Check if current user is the owner of the listing
async function isOwner(req, res, next) {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

// ============================
//          ROUTES
// ============================
// Show all listings on home page
router.get("/", listingController.showAllListings);

// Show all listings
router.get("/listings", listingController.showAllListings);

// New listing form
router.get("/listing/new", isLoggedIn, listingController.renderNewForm);

// Create listing (with image upload)
router.post(
  "/listing",
  isLoggedIn,
  upload.single("image"), // Matches the name in the new.ejs form
  listingController.createListing
);

// Show specific listing
router.get("/listings/:id", listingController.showListing);

// Edit form
router.get(
  "/listings/:id/edit",
  isLoggedIn,
  isOwner,
  listingController.renderEditForm
);

// Update listing (image optional)
router.put(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"), // Matches name in edit.ejs form
  listingController.updateListing
);

// Delete listing
router.delete(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  listingController.deleteListing
);

module.exports = router;
