const express = require('express'),
      router  = express.Router();


// target url already prefixed in app js
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
}) ;

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /products'
    });
}) ;

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    if(productId === 'special') {
        res.status(200).json({ message: 'You have discovered special id' });
    } else {
        res.status(500).json({ message: 'You passed an ID' });
    }
});

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    res.status(200).json({ message: 'Updated special id' });
   
});

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    res.status(200).json({ message: 'Updated special id' });
});

module.exports = router ;