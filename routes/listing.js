const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")
const {listingSchema}=require("../schema.js")


const validateListing=(req,res,next)=>{
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//Index Route
router.get("/",wrapAsync( async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));
  
  //New Route
  router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  
  //Show Route
  router.get("/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  }));
  
  //Create Route
  router.post("/",validateListing,wrapAsync( async (req, res) => {
    const listingData = req.body.listing;
    
    // If image URL is empty, use the default image
    if (!listingData.image || !listingData.image.url || listingData.image.url.trim() === "") {
      listingData.image = {
        url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        filename: "defaultImage"
      };
    }
  
    const newListing = new Listing(listingData);
    await newListing.save();
    res.redirect("/listings");
  }));
  
  //Edit Route
  router.get("/:id/edit",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }));
  
  //Update Route
  router.put("/:id",validateListing,wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listingData = req.body.listing;
      
      // If image URL is empty, use the default image
      if (!listingData.image || !listingData.image.url || listingData.image.url.trim() === "") {
          listingData.image = {
              url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
              filename: "defaultImage"
          };
      }
  
      await Listing.findByIdAndUpdate(id, listingData);
      res.redirect(`/listings/${id}`);
  }));
  
  //Delete Route
  router.delete("/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  }));

  module.exports = router;