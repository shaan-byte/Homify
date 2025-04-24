const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js")
const {isLoggedIn}=require("../middleware.js")
const {isOwner}=require("../middleware.js")
const {validateListing}=require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")

const upload = multer({ storage})



//Index Route and create route
router.route("/")
.get(wrapAsync(listingController.index))
//.post(isLoggedIn,validateListing,wrapAsync(listingController.createListing)
//);
.post(isLoggedIn,upload.single('listing[image][url]'),(req,res)=>{
  res.send(req.file)
})

//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);
  

//delete update and show route
router.route("/:id").get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing)).
delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))
  
  
  //Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
  

  

  module.exports = router;