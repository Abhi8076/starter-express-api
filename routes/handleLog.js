const express = require('express');
const Log = require('../models/log');
const Client = require('../models/clients');
const router = express.Router();

router.post('/', (req, res)=>{
    const client = Client.find({_id: req.body.Id})
    const log = Log({
        date: req.body.date,
        body: `${req.body.title} - against ${client.fullname}`
    })
    log.save()
    .then(()=>res.status(200));
});

router.get('/', (req, res)=>{
    Log.find({})
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err));
});

module.exports = router