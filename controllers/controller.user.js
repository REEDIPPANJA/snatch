const user = require('../models/model.user');
const bcrypt = require('bcrypt')
const {genratedToken} =require('../utils/genrateToken')
const registerUser= async (req, res) => {
    try {
        let {  fullName,email, password} = req.body;

        bcrypt .genSalt(10, function (err, salt) {

            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                try{
                let User= await user.findOne({email:email}) 
                 if(User)return res.send({"message":"user already exists"});

                    let registedUser = await user.create({
                        email,
                        password: hash,
                        fullName
                    });
                  
                 let token=genratedToken(registedUser);
                 res.cookie("token",token);

                 res.status(201).send({"message":"user created sucessfully "});
 
                }catch(err){
                    res.send(err.message)
                }
                }

            })

        })


        

    } catch (error) {
        console.log(error.message);
    }
}
async function loginUser (req , res){
     let {email, password} = req.body;

     let User = await user.findOne({email:email});
     if(!User) return res.status(404).send({"message":"user Not found"});
    
     let hashPassword= User.password;
     let isMatched=bcrypt.compare(password,hashPassword,(err,result)=>{
        if(result){
            let token=genratedToken(User);
            res.cookie("token",token);
            res.send({"messsage":"you are logged in"})
        }else{
            return res.status(404).send({"message":"email or password incorrect"});
        }
     });
}
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;