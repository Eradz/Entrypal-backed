const jwt = require("jsonwebtoken")

const verifyJwt = (req,res,next) =>{
    let token
    let header = req.headers.Authorization || req.headers.authorization
    if(header.split(" ")[0] === "Bearer"){
        token == header.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                res.status(400).json({message: "Invalid Token or Token expired"})
            } else{
                console.log(decoded)
                res.status(200).json({message: decoded})
            }
        })
    }
}
