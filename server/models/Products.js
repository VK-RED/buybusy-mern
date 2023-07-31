const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
})

const Products = mongoose.model("Products", productSchema);

module.exports = Products;