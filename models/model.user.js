const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    fullName :{
        type:String,
        required: true,
        minLength:3,
        trim:true,
    },
    email :{
        type:String,
        required: true
    },
    password :{
        type:String,
        required: true
    },
    
    // cart : [],
    cart :{
        type:Array,
        default:[]
    },
    orders :{
        type:Array,
        default:[]
    },
    mobileNum:{
        type:Number,
       
    },
    picture:String,

},{timestamps:true})


const User=mongoose.model('User',userSchema);
module.exports=User;