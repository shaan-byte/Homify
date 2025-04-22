const express=require("express")
const mongoose=require("mongoose")
const app=express();
const path=require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const ExpressError=require("./utils/ExpressError.js")
const listings=require("./routes/listing.js")
const reviews=require("./routes/review.js")
MONGO_URL="mongodb+srv://shaanqureshi770:sara786@shaandb.mibdl85.mongodb.net/Wanderhome"
async function main(){await mongoose.connect(MONGO_URL);};

main().then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log(err)
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/",async (req,res)=>{
    res.send("HEllo world")
})

app.use("/listings", listings);
app.use("/listings/:id/reviews",reviews)

app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res,next)=>{
  let{statusCode=500,message="Something went wrong"}=err;
  res.status(statusCode).render("error.ejs",{message});
  // res.status(statusCode).send(message);
})

app.listen(8080,()=>{
    console.log("Server started on port 8080")
})