const User = require('../models/User');



//FUNCTION TO ROUND OF THE NUMBERS 
function roundToTwoDecimalPlaces(number) {
    return Number(number.toFixed(2));
}

const addToOrder = async (req,res)=>{
    const user = await User.findById(req.userId);
    
    if(user.cart.length == 0)
        return res.status(402).send("Cart is Empty Please Add Items to Cart")

    //Calculating the finalPrice
    const netPrice = user.cart.reduce((acc,cur)=>{
        acc+=(cur.price * cur.quantity);
        return acc;
    },0);

    const finalPrice = roundToTwoDecimalPlaces(netPrice);

    const newOrder = {
        purchasedOn : new Date().toDateString(),
        cart : user.cart,
        netPrice : finalPrice,
    }
    

    user.cart = [];
    user.orders.push(newOrder);
    
    user.markModified('cart');
    user.markModified('orders');
    await user.save();

    return res.status(202).json({orders:user.orders, netPrice});

}


const getOrders = async(req,res)=>{
    const user = await User.findById(req.userId);
    return res.status(202).json({
        orders: user.orders,
    })
}

module.exports = {addToOrder,getOrders};