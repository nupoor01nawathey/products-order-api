const express = require('express'),
      app     = express();

const productRoutes = require('./api/routes/products'),
      orderRoutes   = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// middleware  
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

module.exports = app ;