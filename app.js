const express=require("express")
const mongoose=require("mongoose")
const ejs=require("ejs")
const app=express();
const Listing=require("./models/listing.js")
MONGO_URL="mongodb+srv://shaanqureshi770:sara786@shaandb.mibdl85.mongodb.net/Wanderhome"
async function main(){await mongoose.connect(MONGO_URL);};

main().then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log(err)
})

app.get("/",async (req,res)=>{
    res.send("HEllo world")
})

app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "By the beach",
    price: 1200,
    location: "Calangute, Goa",
    country: "India",
  });

  await sampleListing.save();
  console.log("sample was saved");
  res.send("successful testing");
});

app.listen(8080,()=>{
    console.log("Server started on port 8080")
})