const mongoose= require('mongoose');

const ownerSchema= new mongoose.Schema({
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
    
    products :{
        type:Array,
        default:[]
    },
    picture:String,
    gstin : String,


},{timestamps:true})


const Owner=mongoose.model('Owner',ownerSchema);
module.exports=Owner;