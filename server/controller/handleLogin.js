const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = "USERS3CR3T";


function roundToTwoDecimalPlaces(number) {
    return Number(number.toFixed(2));
}

//If the user does n't exists return errr else create a token and send the userDetails as well as the token

const handleLogin = async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(!user)
        return res.status(403).send("No User Exists, Please SignUp");

    if(user.password != password)
        return res.status(403).send("Incorrect Password");

    const token = jwt.sign({userId:user.id},SECRET_KEY,{expiresIn:'1h'});
    const netPrice = user.cart.reduce((acc,cur)=>{
        acc+=(cur.price * cur.quantity);
        return acc;
    },0);

    const finalPrice = roundToTwoDecimalPlaces(netPrice);
    return res.status(202).json({userId:user.id, email:user.email, cart:user.cart, orders:user.orders, netPrice:finalPrice, token});
}

module.exports = {handleLogin};