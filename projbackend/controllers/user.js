const User = require("../models/user");
const Order = require("../models/order");

//Here ID is the parameter we are getting from the url
exports.getUserById = (req,res,next, id) => {
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        //saving user into the profile
        req.profile = user;
        next();
    })
};

exports.getUser = (req,res) => {
    
    //setting some values of the profile to undefined to hide.
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.updatedAt = undefined;
    req.createdAt = undefined;
    return res.json(req.profile)
};

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        //These are the parameters of the findByIdAndUpdate Method
        {_id: req.profile._id},
        {$set:req.body},
        //These are the compulsory parameters to pass when we use this update method
        {new: true, useFindAndModify: false},
        (err,user) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req,res) => {
    Order.find({user: req.profile._id})
    //populate will take two first is reference object, second is values which are needed
    .populate("user","_id name")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error: "No Order in this account"
            })
        }
        return res.send(order)
    })
}
//middleware to update purchases
exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    });
    //store this in DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases:purchases}},
        {new: true},
        (err,purchase) => {
            if(err){
                return res.status(400).json({
                    error: "unable to save purchase list"
                })
            }
            next();
        }
    )
    
}