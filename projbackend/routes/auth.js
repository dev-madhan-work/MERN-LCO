const express = require('express')
const { check, validationResult } = require('express-validator');
const router = express.Router();
const {signup,signout,signin,isSignedIn} = require('../controllers/auth')
router.get("/signout",signout);
router.post("/signup",[
    check("name","name should be atleast 3 characters").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","Password  should be atlest 6 characters").isLength({min:6})
],signup)
router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","Password  should be atlest 6 characters").isLength({min:6})
],signin)
router.get("/testroute",isSignedIn,(req,res)=>{
    res.send("A protected route");
})

module.exports = router;    