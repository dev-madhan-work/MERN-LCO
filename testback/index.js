const express = require('express')
const app = express();
const port = 8000
app.get('/',(req,res)=>{
    res.send("hello there!")
})
const admin = (req,res)=>{
    res.send("this is admin dashboard")
}
const isAdmin =(req,res,next)=>{
    console.log("this is in isAdmin.")
    next();
}
const isLoggedIn = (req,res,next)=>{
    console.log("this is in isLoggedIn")
    next();
}
app.get("/admin",isLoggedIn,isAdmin,admin)
app.listen(port)