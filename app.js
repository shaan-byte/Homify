const express=require("express")
const mongoose=require("mongoose")
const app=express();
const path=require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const ExpressError=require("./utils/ExpressError.js")
const listingRouter=require("./routes/listing.js")
const reviewRouter=require("./routes/review.js")
const userRouter=require("./routes/user.js")
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport")
const User=require("./models/user.js")
const LocalStrategy=require("passport-local")
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

const sessionOptions={
  secret:"mysupersecrecode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+1000*60*60*24*7, // 7 days
    maxAge:1000*60*60*24*7, // 7 days
    httpOnly:true,
  }
};

app.get("/",async (req,res)=>{
  res.send("HEllo world")
})

app.use(session(sessionOptions))
app.use(flash())
//passport needs session to be initialized before it
app.use(passport.initialize())
app.use(passport.session()) //passport.session() is used to save the session in the database
passport.use(new LocalStrategy(User.authenticate())) //passport-local-mongoose method to authenticate the user

passport.serializeUser(User.serializeUser()) //store the user info to save in the session
passport.deserializeUser(User.deserializeUser()) //unstore the user info from the session


app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error=req.flash("error")
  next()
})

// app.get("/demouser",async (req,res)=>{
//   let fakeUser={
//     email:"student@gmial.com",
//     username:"student",
//   }
//   let registeredUserr=await User.register(fakeUser,"password")
//   res.send(registeredUserr)
// })

app.use("/listings", listingRouter); // /listings is the base route for all the routes in listing.js
app.use("/listings/:id/reviews",reviewRouter) // /listings/:id/reviews is the base route for all the routes in review.js
app.use("/", userRouter); // / is the base route for all the routes in user.js

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