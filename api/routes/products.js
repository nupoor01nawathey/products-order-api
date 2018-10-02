const express = require('express'),
       multer = require('multer'),
       router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const ProductControllers = require('../controllers/products');

// multer config
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/'); // image folder
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);  // customize file name
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'jpeg' || file.mimetype === 'image/png') { // acceptable image types
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // accept file size upto 5Mb only
    },
    fileFilter: fileFilter
});


// target url already prefixed in app js
router.get('/', ProductControllers.getAllProducts);

router.post('/', checkAuth, upload.single('productImg'), ProductControllers.createProduct);

router.get('/:productId', checkAuth, ProductControllers.getSingleProduct);

router.patch('/:productId', checkAuth, ProductControllers.updateProduct);

router.delete('/:productId', checkAuth, ProductControllers.deleteProduct);

module.exports = router ;

// to create product
// name price productImg in the Body as key value pair
// Key -> Authorization Value -> Bearer token in Headers, remove content-type from headers