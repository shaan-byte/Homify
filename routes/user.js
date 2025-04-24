const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js")
const userController = require("../controllers/users.js")


//signup routes
router.route("/signup")
.get(userController.renderSignupForm).
post(wrapAsync(userController.signUp))


//login routes
router.route("/login").
get(userController.renderLoginForm).
post(saveRedirectUrl,passport.authenticate("local", {
    failureRedirect: "/login",
   failureFlash: true
}), userController.login)

//logout route

router.get("/logout",userController.logout); 

    
module.exports = router;