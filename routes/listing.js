const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js")
const {isLoggedIn}=require("../middleware.js")
const {isOwner}=require("../middleware.js")
const {validateListing}=require("../middleware.js")


//Index Route
router.get("/",wrapAsync( async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));
  
  //New Route
  router.get("/new", isLoggedIn,(req, res) => {
    // Check if the user is logged in before allowing them to create a new listing
    res.render("listings/new.ejs");
  });
  
  //Show Route
  router.get("/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
      path:"author",
    },
  }).populate("owner");
    if(!listing) {
      req.flash("error", "Listing not found");
       res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }));
  
  //Create Route
  router.post("/",isLoggedIn,validateListing,wrapAsync( async (req, res) => {
    const listingData = req.body.listing;
    
    // If image URL is empty, use the default image
    if (!listingData.image || !listingData.image.url || listingData.image.url.trim() === "") {
      listingData.image = {
        url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        filename: "defaultImage"
      };
    }
  
    const newListing = new Listing(listingData);
    newListing.owner = req.user._id; // Set the owner to the logged-in user
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
  }));
  
  //Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
      req.flash("error", "Listing not found");
       res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }));
  
  //Update Route
  router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async (req, res) => {
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
      req.flash("success", "Successfully updated the listing!");
      res.redirect(`/listings/${id}`);
  }));
  
  //Delete Route
  router.delete("/:id",isLoggedIn,isOwner,wrapAsync( async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
  }));

  module.exports = router;