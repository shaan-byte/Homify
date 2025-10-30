const User= require("../models/user.js")
const passport = require("passport");

module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs");
  }

  module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.signUp=async (req,res,next)=>{
    try{
    let {username,email,password}=req.body
    let newUser=new User({username,email})
  const registeredUser= await User.register(newUser,password) //register method is used to register the user in the database
  req.login(registeredUser, (err)=>{
    if(err){
        return next(err)
    }
    req.flash("success", "Welcome to DreamNest!")
    res.redirect("/listings")
  })}
  catch(e){
    req.flash("error",e.message)
    res.redirect("/signup")
}}


module.exports.login=async (req, res) => {
    req.flash("success", "Welcome back to DreamNest!");
    let redirectUrl = res.locals.redirectUrl || "/listings" //if redirectUrl is not set, redirect to listings page
    res.redirect(redirectUrl ); //redirect to the original url or listings page
}

module.exports.logout=(req, res,next) => {
    req.logout((err) => {
        if (err) {
        return next(err);
        }
        req.flash("success", "Goodbye! You have logged out successfully.");
        res.redirect("/listings");
    });
}