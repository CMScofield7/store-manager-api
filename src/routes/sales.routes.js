const express = require('express');

const { salesController } = require('../controllers');
const { validateSale } = require('../middlewares/validateSale');

const router = express.Router();

router.post('/sales', validateSale, salesController.createProduct);

module.exports = router;