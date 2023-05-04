const jwt= require("jsonwebtoken");

let JWT_SECRET_KEY = "Maticz_Technologies"; 

//token generate process and verifyprocess
async function createToken(payload){

   return jwt.sign(payload, JWT_SECRET_KEY,{
        expiresIn:'1d'
    });
}
async function verifyToken(token){
    return jwt.verify(token,JWT_SECRET_KEY);
}

module.exports={createToken,verifyToken};
