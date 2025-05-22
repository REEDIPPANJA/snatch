const user = require('../models/model.user');
const bcrypt = require('bcrypt')
const {genratedToken} =require('../utils/genrateToken')
const registerUser= async (req, res) => {
    try {
        let { email, password, fullName } = req.body;

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
module.exports.registerUser = registerUser;