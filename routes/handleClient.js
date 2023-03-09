const express = require('express');
const Client = require('../models/clients');
const { Order } = require('../models/orders');
const Payment = require('../models/payment');
const router = express.Router();

// get all clients
router.get('/all', (req,res) => {
    Client.find({}).then(async(data)=>{
        let rdata = [];
        for(let i = 0; i < data.length; i++){
            let orders = await Order.find({ clientId: data[i]._id });
            let payments = await Payment.find({ clientId: data[i]._id });
            let total=0,paid=0;
            for(let j = 0; j < orders.length; j++){
                let sum = 0;
                for(let k = 0; k < orders[j].items.length; k++){
                    sum = sum + orders[j].items[k].amount;
                }
                total = total + sum;
            }
            for(let k=0;k<payments.length; k++){
                paid += payments[k].amount;
            }
            rdata.push({
                _id: data[i]._id, 
                fullname: data[i].fullname,
                nickname: data[i].nickname,
                address: data[i].address,
                state: data[i].state,
                phnno: data[i].phnno,
                total: total,
                paymentDue: total-paid,
                paid: paid
            });
        }
        res.send(rdata);
    }).catch((err)=>res.send(err));
});

router.get('/all-wot', (req,res) => {
    Client.find({}).then((data)=>{
        res.send(data);
    }).catch((err)=>res.send(err));
});

router.get('/:id', (req,res) => {
    Client.find({_id: req.params.id}).then((data)=>res.send(data)).catch((err)=>res.send(err));
});

// search client
router.get('/one', (req,res) => {
    Client.find(
        { $text: { $search: req.query.s } },
        { score: { $meta: "textScore" } }
     ).sort( { score: { $meta: "textScore" } } )
     .then((data)=>res.send(data))
     .catch((err)=>console.log(err));
});

// create client
router.post('/', (req,res) => {
    var client = Client(req.body);
    client.save().then((data)=>res.send(data)).catch((err)=>console.log(err));
});

module.exports = router