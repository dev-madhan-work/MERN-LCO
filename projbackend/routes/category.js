const express = require('express')
const router = express.Router()

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,deleteCategory} = require('../controllers/category')
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
//whenever we have userid as param, pass it through middleware and populate
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual routes goes here
//create route
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin, 
    createCategory
);
//read route
router.get("/category/:categoryId", getCategory)
router.get("/category/:categoryId", getAllCategory)

//update
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin, 
    updateCategory
);

//delete
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory
);
module.exports = router;