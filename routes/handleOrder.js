const express = require('express');
const router = express.Router();
const { createDailyOrder, getAllOrders, getDailyOrders, findOrderByClientId, updateDailyOrder, getinvoicePdf, doneOrder } = require('../controllers/orders');

// create Order to pack
router.post('/', createDailyOrder);

router.get('/all', getAllOrders);
router.get('/d-orders', getDailyOrders);
router.get('/:id', findOrderByClientId);
router.put('/:id', updateDailyOrder);
router.get('/invoice/:id', getinvoicePdf);
router.get('/done/:id', doneOrder)

module.exports = router