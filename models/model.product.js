const mongoose= require('mongoose');

const productSchema= new mongoose.Schema({
    image:String,
    productName :{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        default:0,
    },


    bgcolor : String,
    panelcolor : String,
    textcolor : String,



},{timestamps:true})


const Product=mongoose.model('Product',productSchema);
module.exports=Product;