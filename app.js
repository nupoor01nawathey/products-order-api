const express     = require('express'),
       morgan     = require('morgan'),
       bodyParser = require('body-parser'),
       mongoose   = require('mongoose'),
       app        = express();

const productRoutes = require('./api/routes/products'),
      orderRoutes   = require('./api/routes/orders');

const nodemon = require('./nodemon');

app.use(morgan('dev'));    
app.use(bodyParser.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

// handle cross origin resource sharing, allow clients to access restful api urls
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // allow all urls
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization');
    
    if(req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'POST', 'PATCH', 'DELETE', 'PUT', 'GET');
        return res.status(200).json({});
    }
    next();
});

const uri = "mongodb+srv://root:" + process.env.ATLAS_MONGO_PW + "@cluster1-fbbro.mongodb.net/ProdOrdAPI?retryWrites=true"
mongoose.connect(
    uri,
    { useNewUrlParser : true }
);

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