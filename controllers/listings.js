const Listing = require("../models/listing.js");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

  module.exports.renderNewForm=(req, res) => {
    // Check if the user is logged in before allowing them to create a new listing
    res.render("listings/new.ejs");
  }

   module.exports.showListing=async (req, res) => {
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
    }

    module.exports.createListing= async (req, res) => {
      let url=req.file.path;
      let filename=req.file.filename;
      
    const listingData = req.body.listing;
    listingData.image = { url, filename }; // Set the image URL and filename from the uploaded file
      
        const newListing = new Listing(listingData);
        newListing.owner = req.user._id; // Set the owner to the logged-in user
        await newListing.save();
        req.flash("success", "Successfully created a new listing!");
        res.redirect("/listings");
      }

      module.exports.renderEditForm= async (req, res) => {
          let { id } = req.params;
          const listing = await Listing.findById(id);
          if(!listing) {
            req.flash("error", "Listing not found");
             res.redirect("/listings");
          }
          res.render("listings/edit.ejs", { listing });
        }

        module.exports.updateListing=async (req, res) => {
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
        }

        module.exports.deleteListing= async (req, res) => {
            let { id } = req.params;
            let deletedListing = await Listing.findByIdAndDelete(id);
            req.flash("success", "Successfully deleted the listing!");
            res.redirect("/listings");
          }