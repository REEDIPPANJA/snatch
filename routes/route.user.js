const express = require('express');
const userRoute = express.Router();

const {registerUser}=require('../controllers/controller.user')



userRoute.get('/', (req, res) => {
    res.send("hey its working");
})

userRoute.post('/register',registerUser);

module.exports = userRoute;