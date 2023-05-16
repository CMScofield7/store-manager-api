const express = require('express');

const { salesController } = require('../controllers');
const { validateSale } = require('../middlewares/validateSale');

const router = express.Router();

router.post('/sales', validateSale, salesController.createSale);
router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSalesWithProductsById);

module.exports = router;