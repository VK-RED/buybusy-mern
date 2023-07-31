const express = require('express');
const router = express.Router();

//GET ALL THE PRODUCTS FROM D.B AND RETURN TO THE CLIENT
const {getProducts} = require('../controller/getProducts');
const {handleSignup} = require('../controller/handleSignup');
const {handleLogin} = require('../controller/handleLogin');

router.get('/',getProducts);

//HANDLE THE SIGNUP, LOGIN ROUTES 
router.post('/signup', handleSignup);
router.post('/login', handleLogin);

//ROUTING TO CART PAGE
router.use('/cart', require('./cart'));
router.use('/orders', require('./orders'));

module.exports = router;