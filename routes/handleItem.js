const express = require('express');
const Items = require('../models/Items');
const router = express.Router();

router.post('/', (req, res) => {
    var item = Items({itemName: req.body.item});
    item.save()
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((err)=>res.status(500).send(err));
});

router.get('/', (req, res) => {
    Items.findAll()
    .then((data)=>{
        data.sort(function (a, b) {
            return a.itemName.localeCompare(b.itemName);
        });
        res.status(200).send(data);
    })
    .catch((err)=>res.send(err));
});

module.exports = router