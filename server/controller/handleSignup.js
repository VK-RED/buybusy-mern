const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = "USERS3CR3T";

//If the user exists return an error msg, else create a new user and generate a token

const handleSignup = async(req,res)=>{
    const{userName,email,password} = req.body;
    const user = await User.findOne({email});
    
    if(user)
        return res.status(403).send("User Exists Already, Kindly Please Login");

    const newUser = new User({userName, email, password, cart:[], orders:[]});
    await newUser.save();

    const token = jwt.sign({
        userId: newUser.id,
    }, SECRET_KEY, {expiresIn:'1h'});


    return res.status(202).json({message: "User Signed In Successfully", userId:newUser.id, token, cart:[], orders:[], netPrice:0});


}

module.exports = {handleSignup};