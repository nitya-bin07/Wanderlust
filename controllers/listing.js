const Listing = require("../models/listing");

// Show all listings
module.exports.showAllListings = async (req, res) => {
  const alllisting = await Listing.find({});
  res.render("listings/index.ejs", { alllisting });
};

// Render form to create new listing
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Create a new listing with image upload
module.exports.createListing = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    // Check if an image was uploaded
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};

// Show listing details
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "username"
      }
    })
    .populate("owner", "username");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
};

// Update a listing with optional image update
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true
  });

  // If a new image is uploaded, replace the image
  if (req.file) {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await updatedListing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

// Delete a listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
