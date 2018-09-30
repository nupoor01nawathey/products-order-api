const express = require('express'),
       morgan = require('morgan'),
       app    = express();

const productRoutes = require('./api/routes/products'),
      orderRoutes   = require('./api/routes/orders');

app.use(morgan('dev'));    

// Handle products and orders routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 401;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// middleware  
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

module.exports = app ;