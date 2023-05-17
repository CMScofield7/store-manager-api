const express = require('express');

const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getProductsById);

router.post('/products', validateName, productsController.createProduct);

router.put('/products/:id', validateName, productsController.updateProduct);

module.exports = router;