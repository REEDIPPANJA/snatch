const express = require('express')
const cookieParser=require('cookie-parser')
const app= express();
require('dotenv').config({ path: '.env.development' });
const path = require('path')
const dbConnect= require('./config/config.dbconnect');

const userRoute=require('./routes/route.user');
const ownerRoute=require('./routes/route.owner');
const productRoute=require('./routes/route.product');
const indexRoute=require('./routes/route.index.js');

const expressSession =require("express-session");
const flash=require("connect-flash");

dbConnect();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash());//does work only when express session is setup
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");


app.get('/home',(req,res)=>{
    res.status(200).send({"message":"tested successfully!!!!!"});
})

app.use("/",indexRoute);
app.use('/users',userRoute);
app.use('/owner',ownerRoute);
app.use('/product',productRoute);

app.listen(process.env.PORT,()=>{
    console.log("running successfully")
})