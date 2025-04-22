const express=require("express")
const mongoose=require("mongoose")
const ejs=require("ejs")
const app=express();
const Listing=require("./models/listing.js")
const path=require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const multer = require("multer")
MONGO_URL="kya be chintu ?"
async function main(){await mongoose.connect(MONGO_URL);};

main().then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log(err)
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

app.get("/",async (req,res)=>{
  res.send('hey');
})

//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", upload.single("image"), async (req, res) => {
  const { title, description, price, location, country } = req.body.listing;
  const newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
    image: {
      filename: req.file ? req.file.filename : "defaultImage.jpg",
      url: req.file
        ? `/uploads/${req.file.filename}`
        : "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
  });
  await newListing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", upload.single("image"), async (req, res) => {
  let { id } = req.params;

  // Validate that req.body.listing exists
  if (!req.body.listing) {
    return res.status(400).send("Invalid form submission. Missing listing data.");
  }

  // Find the listing to update
  const listing = await Listing.findById(id);

  // Update listing details
  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.location = req.body.listing.location;
  listing.country = req.body.listing.country;

  // If a new image is uploaded, update the image field
  if (req.file) {
    listing.image = {
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    };
  }

  await listing.save();
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

app.listen(8080,()=>{
    console.log("Server started on port 8080")
})