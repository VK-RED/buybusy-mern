
const User = require('../models/User');

//FUNCTION TO ROUND OF THE NUMBERS 
function roundToTwoDecimalPlaces(number) {
    return Number(number.toFixed(2));
}

//ADD ITEMS TO CART AND INC
const addItems = async (req,res)=>{
    const userId = req.userId;
    const{productId, title, description, price} = req.body;

    //FIND THE USER
    const user = await User.findById(userId);

    //GET THE IND
    let ind = user.cart.findIndex((pr)=>pr.productId == productId);

    //CHECK IF THE CART ALREADY CONTAINS THE PRODUCTID
    if(ind == -1)
        user.cart.push({productId, title, description, price, quantity:1});
    
    else{  
            
        const prevQuantity  = user.cart[ind].quantity;
        user.cart[ind].quantity = prevQuantity+1;

        user.markModified('cart'); // This tells the DB that the cart have been modified.
    }
         

    await user.save();

    const netPrice = user.cart.reduce((acc,cur)=>{
        acc+=(cur.price * cur.quantity);
        return acc;
    },0);


    const finalPrice = roundToTwoDecimalPlaces(netPrice);

    return res.status(202).json({netPrice:finalPrice, cart:user.cart});

}


//DECREASE THE QUANTITY OF THE ITEM
const decItems = async (req,res)=>{
    const user = await User.findById(req.userId);

    const{productId} = req.body;

    const ind = user.cart.findIndex((pr)=>pr.productId == productId);

    if(ind == -1)
        return res.status(402).send("Please check the Product ID");

    user.cart[ind].quantity--;
    if(user.cart[ind].quantity == 0)
        user.cart.splice(ind,1);
    user.markModified('cart');
    await user.save();

    const netPrice = user.cart.reduce((acc,cur)=>{
        acc+=(cur.price * cur.quantity);
        return acc;
    },0);

    const finalPrice = roundToTwoDecimalPlaces(netPrice);
    return res.status(202).json({netPrice:finalPrice, cart:user.cart});

}


//REMOVE THE ITEM COMPLETELY FROM THE CART
const removeItem = async (req,res)=>{
    const user = await User.findById(req.userId);

    const{productId} = req.body;

    const ind = user.cart.findIndex((pr)=>pr.productId == productId);

    if(ind == -1)
        return res.status(402).send("Please check the Product ID");

    user.cart.splice(ind,1);
    user.markModified('cart');
    await user.save();

    const netPrice = user.cart.reduce((acc,cur)=>{
        acc+=(cur.price * cur.quantity);
        return acc;
    },0);

    const finalPrice = roundToTwoDecimalPlaces(netPrice);
    return res.status(202).json({netPrice:finalPrice, cart:user.cart});

}


const clearCart = async (req,res)=>{
    const user = await User.findById(req.userId);
    user.cart = [];
    user.markModified('cart');
    await user.save();

    res.status(203).json({cart:user.cart, netPrice : 0});
}

const getCart = async(req,res)=>{
    const user = await User.findById(req.userId);
    const netPrice = user.cart.reduce((acc,cur)=>{
        acc+=(cur.price * cur.quantity);
        return acc;
    },0);

    const finalPrice = roundToTwoDecimalPlaces(netPrice);
    return res.status(202).json({netPrice:finalPrice, cart:user.cart});
}


module.exports = {addItems,decItems,removeItem, clearCart,getCart};