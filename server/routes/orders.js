const express = require('express');
const router = express.Router();

const {auth} = require('../middleware/middleware');
const {addToOrder,getOrders} = require('../controller/ordersController');

router.get('/',auth,getOrders);
router.post('/add',auth,addToOrder);

module.exports = router;