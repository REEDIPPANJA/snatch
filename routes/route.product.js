const express= require('express');
const productRoute=express.Router();


const upload=require('../config/config.upload');
const productModel=require('../models/model.product');

productRoute.post('/create',upload.single("image"), async (req,res)=>{

    try{let {name , price ,discount ,bgcolor, panelcolor,textcolor }=req.body;
     let product= await productModel.create({
    image:req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor

   });
    req.flash("success","product create sucessfully")
   res.redirect("/owner/admin");
   

}catch(error){
    res.send(error .message)
}

});

module.exports=productRoute;