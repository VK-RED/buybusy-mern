const Products = require('../models/Products');

const getProducts = async(req,res)=>{
    const products = await Products.find({});
    res.status(202).json({products});
}

module.exports = {getProducts};