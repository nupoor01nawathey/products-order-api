const express     = require('express'),
       bodyParser = require('body-parser'),
       mongoose   = require('mongoose'),
       app        = express();

const productRoutes = require('./api/routes/products'),
      orderRoutes   = require('./api/routes/orders'),
      userRoutes    = require('./api/routes/users');

const {createLogger, format, transports} = require('winston'),
      {combine, timestamp, prettyPrint } = format;


const logger = createLogger({
    transports: [
        new transports.File({
            filename: './logs/api.out',
        }),
        new transports.File({
            filename: './logs/api.err',
        })
    ],
    format: combine(timestamp(), prettyPrint())
});

logger.info('Going to initialize multer');

app.use('./uploads', express.static('uploads')); // make multer images public
app.use(bodyParser.urlencoded({limit: '50mb',extended: true})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json

// handle cross origin resource sharing, allow clients to access restful api urls
logger.info('Going to initialize CORS');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // allow all urls
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'
    );
    if(req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'POST', 'PATCH', 'DELETE', 'PUT', 'GET');
        return res.status(200).json({});
    }
    next();
});

logger.info('Going to setup MongoDB Atlas connection string');
const uri = "mongodb+srv://root:" + process.env.ATLAS_MONGO_PW + "@cluster1-fbbro.mongodb.net/ProdOrdAPI?retryWrites=true"
mongoose.connect(
    uri,
    { useNewUrlParser : true }
);

// Handle products and orders routes
logger.info('Going to handle /products route');
app.use('/products', productRoutes);

logger.info('Going to handle /orders route');
app.use('/orders', orderRoutes);

logger.info('Going to handle /users route');
app.use('/users', userRoutes);

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

module.exports = app ;