const mongoose = require("mongoose");
const axios = require("axios");
const initData = require("./data.js"); // Import the sample listings
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://yuval:yuval123@cluster0.fjf8vzg.mongodb.net/";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");
}

async function geocodeLocation(location) {
  try {
    const geoResponse = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: location,
          format: "json",
          limit: 1,
        },
      }
    );
    const coordinates = geoResponse.data[0]
      ? [parseFloat(geoResponse.data[0].lon), parseFloat(geoResponse.data[0].lat)] // [longitude, latitude]
      : [0, 0]; // Default to [0, 0] if no coordinates are found
    return coordinates;
  } catch (err) {
    console.error(`Error geocoding location "${location}":`, err.message);
    return [0, 0]; // Default to [0, 0] on error
  }
}

const initDB = async () => {
  await Listing.deleteMany({});
  console.log("Deleted all listings");

  for (const listing of initData) {
    const coordinates = await geocodeLocation(listing.location);
    const newListing = new Listing({
      ...listing,
      coordinates, // Add the coordinates field
    });
    await newListing.save();
    console.log(`Saved listing: ${listing.title} with coordinates: ${coordinates}`);
  }

  console.log("Database initialized with listings and coordinates");
};

main()
  .then(() => initDB())
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });