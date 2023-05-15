const express = require('express');

const productsRoute = require('./products.routes');

const router = express.Router();

router.use(productsRoute);

module.exports = router;