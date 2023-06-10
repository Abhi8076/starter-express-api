const express = require('express');
const { D_Orders } = require('../models/orders');
const router = express.Router();
const mongoose = require('mongoose');
const { createDailyOrder, getAllOrders, getDailyOrders, findOrderByClientId, updateDailyOrder, getinvoicePdf } = require('../controllers/orders');

// create Order to pack
router.post('/', createDailyOrder);

router.get('/all', getAllOrders);
router.get('/d-orders', getDailyOrders);
router.get('/:id', findOrderByClientId);
router.put('/:id', updateDailyOrder);
router.get('/invoice/:id', getinvoicePdf);

router.get('/done/:id', async (req, res) => {
    await D_Orders.findByIdAndUpdate(req.params.id, {$set:{status: "done"}});
    mongoose.model('daily_orders').findOne({ _id: req.params.id }, function(err, result) {

        if (err) {
            console.log(err);
            return;
        } else {
            let swap = mongoose.model('orders')(result);
            swap.isNew = true
            result.remove();
            swap.save(); 
            console.log("Successful moved");
            res.json({ data: result, success: true, msg: 'Successful moved a record.' });
    
        } 
    });
})

module.exports = router