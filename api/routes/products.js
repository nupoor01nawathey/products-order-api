const express = require('express'),
    mongoose  = require('mongoose'),
      router  = express.Router();

const Product = require('../models/products');

// target url already prefixed in app js
router.get('/', (req, res, next) => {
    Product.find({})
    .then(docs => {
        if(docs.length >= 0) {
            res.status(200).json({
                results: docs 
            });
        } else {
            res.status(404).json({
                message: 'No products found in the database'
            });           
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then( result => {
        console.log(result);
        res.status(200).json({
            message: 'Handling POST requests to /products',
            createdProduct: product
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
}) ;

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json({ 
                message: 'Requested id is found',
                foundProduct: doc
            });
        } else {
            res.status(404).json({ 
                message: 'No product found for requested productId',
                foundProduct: null
            });           
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });  
   });


router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.findByIdAndUpdate({ _id: productId}, { $set: req.body })
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.findByIdAndRemove( {_id: productId} )
    .then(res => {
        console.log(res);
        res.status(200).json({
            message: 'Deleted requested id',
            result: res
        });
    })
    .catch( err => {
        if(err.length > 0) {
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Deleted requested id' + productId,
            }); 
        }
    });
});

module.exports = router ;