const jwt=require('jsonwebtoken');
const user = require('../models/model.user');

async function isLogged(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/");
    }

    try{
        let decode=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let User= user.findOne({email:email}).select("-password");

        req.user=User;

        next();

    }catch(error){
        req.flash("somrthing went wrong ");
        return res.redirect("/");
    }
}
module.exports = isLogged;