const express = require('express');
const { getPaymentByClientId, savePayment } = require('../controllers/payment');
const router = express.Router();

router.post('/', savePayment);

router.get('/:id', getPaymentByClientId);

module.exports = router