const express = require('express');
const userRoute = express.Router();

const {registerUser , loginUser,logoutUser}=require('../controllers/controller.user')



userRoute.get('/', (req, res) => {
    res.send("hey its working");
})

userRoute.post('/register',registerUser);
userRoute.post('/login',loginUser);
userRoute.get("/logout",logoutUser);

module.exports = userRoute;