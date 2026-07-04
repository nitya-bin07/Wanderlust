if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;
const OWNER_ID = new mongoose.Types.ObjectId("6867e1022c20d2d299f4104e");

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to DB");
    initDB();
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    const listingsWithOwner = data.data.map((listing) => ({
      ...listing,
      owner: OWNER_ID,
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log("Data seeded with owner.");
    mongoose.connection.close(); // <- close connection after seeding
  } catch (err) {
    console.error("Seeding error:", err);
  }
};
