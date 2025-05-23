const express=require('express');
const router= express.Router();
const isLogged= require("../middlewares/middleware.islogedin");
const productModel= require('../models/model.product');
const userModel= require('../models/model.user');

router.get("/", (req,res)=>{
    let error=req.flash("error");
    let success=req.flash("success")
    res.render("index",{ error,success ,loggedin :false });
});

router.get("/shop",isLogged,async (req,res)=>{  
    let products = await productModel.find();
    let success= req.flash("success");
      res.render("shop",{products, success});
});
router.get("/cart",isLogged,async (req,res)=>{  
    let user=await userModel
    .findOne({email:req.user.email})
    .populate("cart");
    
let totalMRP = user.cart.reduce((acc, item) => acc + item.price, 0);
let totalDiscount = user.cart.reduce((acc, item) => acc + (item.discount || 0), 0);
let platformFee = 20;
let final = totalMRP - totalDiscount + platformFee;

res.render('cart', {
  user,
  totalMRP,
  totalDiscount,
  final
});

});

router.get("/addtocart/:productid",isLogged, async (req,res)=>{
  let user=await userModel.findOne({email : req.user.email});
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success","item added to cart")
  res.redirect("/shop");

})


module.exports = router;