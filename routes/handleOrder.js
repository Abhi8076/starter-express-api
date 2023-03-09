const express = require('express');
const { Order, D_Orders } = require('../models/orders');
const Client = require('../models/clients');
const router = express.Router();
const mongoose = require('mongoose');
const Invoice = require('../invoice/index');

// create Order to pack
router.post('/', (req, res) => {
    let order = D_Orders(req.body);
    order.save()
    .then(()=>res.status(200).send('ok'))
    .catch(err=>console.error(err));
})

router.get('/all', (req, res) => {
    Order.find({})
    .then((data)=>res.send(data))
    .catch((err)=>console.log(err));
})

router.get('/d-orders', (req, res) => {
    D_Orders.find({})
    .then((data)=>res.send(data))
    .catch((err)=>console.log(err));
})

router.get('/:id', (req, res) => {
    Order.find({clientId: req.params.id})
    .then((data)=>res.send(data))
    .catch((err)=>console.log(err));
})

router.put('/:id', (req, res) => {
    let temp = req.body;
    for(let i=0; i<temp.length; i++){
        temp[i].amount = temp[i].quantity*temp[i].itemRate;
    }
    D_Orders.findByIdAndUpdate(req.params.id, {$set:{items: temp, status: "sent"}})
    .then(()=>res.status(200).json({status: 'done'}))
    .catch((err)=>res.send(err));
})

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

router.get('/invoice/:id', async (req, res) => {
    let order = await Order.findById(req.params.id);
    if(order == null)
    order = await D_Orders.findById(req.params.id);
    let client = await Client.findById(order.clientId);

    Invoice(client, order)
    .then((pdf)=>res.send({pdf: pdf}));
})

module.exports = router