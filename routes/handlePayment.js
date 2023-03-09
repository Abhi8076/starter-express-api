const express = require('express');
const Payment = require('../models/payment');
const router = express.Router();

router.post('/', (req, res)=>{
    const payment = Payment(req.body);
    payment.save()
    .then(()=>res.status(200).send('ok'))
    .catch((err)=>res.send(err));
});

router.get('/:id', (req, res)=>{
    Payment.find({ clientId: req.params.id})
    .then((payments)=>res.status(200).send(payments))
    .catch((err)=>res.send(err));
});

module.exports = router