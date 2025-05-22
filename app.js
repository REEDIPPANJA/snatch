const express = require('express')
const cookieParser=require('cookie-parser')
const app= express();
require('dotenv').config({ path: '.env.development' });
const dbConnect= require('./config/config.dbconnect');

const userRoute=require('./routes/route.user');
const ownerRoute=require('./routes/route.owner');
const productRoute=require('./routes/route.product');

dbConnect();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());


app.get('/home',(req,res)=>{
    res.status(200).send({"message":"tested successfully!!!!!"});
})

app.use('/user',userRoute);
app.use('/owner',ownerRoute);
app.use('/product',productRoute);

app.listen(process.env.PORT,()=>{
    console.log("running successfully")
})