const jwt = require("jsonwebtoken")
/*
Here the token is sent from the header from the 
*/
const verifyJwt = (req,res,next) =>{
    let token
    let header = req.headers.Authorization || req.headers.authorization
    if(header && header.split(" ")[0] === "Bearer"){
        token = header.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                res.status(401).json({message: "Invalid token or Token expired"})
            } else{
                res.status(200).json({message: decoded})
            }
        })
    }else{
       res.status(401).json({message: "Headers not set"})
    }
}

module.exports = verifyJwt