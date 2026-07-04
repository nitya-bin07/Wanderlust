const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { cloudinary } = require("../cloudConfig");

const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      set: (v) => (v && v.trim() !== "" ? v : DEFAULT_IMAGE_URL),
      default: DEFAULT_IMAGE_URL,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Delete associated reviews
listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    // Delete reviews
    await Review.deleteMany({ _id: { $in: doc.reviews } });

    // Delete Cloudinary image if it exists and is not default
    if (doc.image && doc.image.filename && !doc.image.url.includes("unsplash.com")) {
      try {
        await cloudinary.uploader.destroy(doc.image.filename);
      } catch (err) {
        console.error("Cloudinary deletion failed:", err);
      }
    }
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
