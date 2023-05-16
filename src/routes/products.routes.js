const express = require('express');

const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getProductsById);

router.post('/products', validateName, productsController.createProduct);

module.exports = router;