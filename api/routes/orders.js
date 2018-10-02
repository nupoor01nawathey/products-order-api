const express = require('express'),
      router  = express.Router();

const mongoose = require('mongoose');

const checkAuth = require('../middleware/checkAuth');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.getAllOrders);

router.post('/', checkAuth, OrdersController.createOrder);

router.get('/:orderId', checkAuth, OrdersController.getSingleOrder);

router.delete('/:orderId', checkAuth, OrdersController.deleteOrder);

module.exports = router;