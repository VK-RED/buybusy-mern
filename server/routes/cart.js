const express = require('express');
const router = express.Router();

const {auth} = require('../middleware/middleware');

const {addItems,decItems,removeItem,clearCart,getCart} = require('../controller/cartController');

//ADD, DEC, REMOVE, RESET, GET THE CART

router.get('/',auth,getCart);
router.post('/addItems',auth,addItems);
router.post('/decItems',auth,decItems);
router.post('/removeItems',auth,removeItem);
router.post('/clearCart',auth,clearCart);

module.exports = router;