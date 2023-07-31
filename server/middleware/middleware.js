const jwt = require('jsonwebtoken');
const SECRET_KEY = "USERS3CR3T";

const auth = (req,res,next) => {
    const token = req.headers.authorization;
    if(!token)
        return res.status(403).json({message:"tokken missing"})

    const decoded = jwt.verify(token,SECRET_KEY);
    if(!decoded.userId)
        return res.status(402).send("Invalid Token");
    else{
        req.userId = decoded.userId;
        next();
    } 
}

module.exports = {auth};