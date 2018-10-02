const mongoose = require('mongoose'),
         Order = require('../models/orders'),
       Product = require('../models/products');

exports.getAllOrders = (req, res, next) => {
    Order.find()
    .populate('product')
    .select('product quantity _id')
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
};


exports.createOrder = (req, res, next) => {
    // create orders only if product exists
    Product.findById(req.body.productId)
    .then(product => {
        if(product.length <= 0) {
            return res.status(404).json({
                'message': 'Product not found',
                error: err
            });  
        }
        const order = new Order ({
            _id: mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity
        });
        order.save()
        .then(result => {
            res.status(200).json({
                message: 'Created new order',
                createdOrder: result,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders/' + result._id          
                }
            });
        })
        .catch( err => {
            return res.status(500).json({
                error: err
            });
        });
    });
};

exports.getSingleOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId, (err, order) => {
        if(err) {
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + order._id 
                }
            });
        }
    });
}

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findByIdAndRemove( {_id: orderId} )
    .then(res => {
        console.log(res);
        res.status(200).json({
            message: 'Deleted requested order id',
            result: res
        });
    })
    .catch( err => { // fix this ??
        if(err.length > 0) {
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Deleted requested order id' + orderId,
            }); 
        }
    });
}