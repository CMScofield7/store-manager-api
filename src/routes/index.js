const express = require('express');

const productsRoute = require('./products.routes');
const salesRoute = require('./sales.routes');

const router = express.Router();

router.use(productsRoute);
router.use(salesRoute);

module.exports = router;