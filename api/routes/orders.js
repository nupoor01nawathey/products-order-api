const express = require('express'),
      router  = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handing GET requests to /orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.params.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'Handing POST requests to /orders',
        createdOrder: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        message: 'Handing GET ONE requests to /orders',
        orderId: orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        message: 'Handing DELETE requests to /orders',
        orderId: orderId
    });
});

module.exports = router;