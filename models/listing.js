const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description:{type: String,
    required: true,
  },
  image: [{
    filename: {
      type: String,
    },
    url: {
      type: String,
    },
  }],
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'], // Must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  category: {
    type: String,
    enum: ["Trending", "Peaceful",
      "Mountains",
      "Beach",
      "Nature",
      "Arctic",
      "Village",
      "Royal",
      "Homely",
      "Suburban",
      "Desert"],
    required: true,
  }
});

listingSchema.post("findOneAndDelete", async (listing)=> {
  if(listing){
  await Review.deleteMany({
    _id:{
      $in:listing.reviews
    }
})}
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;