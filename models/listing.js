const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  country: String,
  coordinates: {
    type: [Number], // Array of numbers: [longitude, latitude]
    required: true,
  },
  image: {
    filename: String,
    url: String,
  },
});

module.exports = mongoose.model("Listing", listingSchema);