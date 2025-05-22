const jwt = require('jsonwebtoken');

let genratedToken= (user)=>{
    let {email ,_id}=user;
    return  jwt.sign({email,_id},process.env.JWT_KEY, { expiresIn: '7d' });
}


module.exports.genratedToken =genratedToken