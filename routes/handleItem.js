const express = require('express');
const Item = require('../models/items');
const router = express.Router();

router.post('/', (req, res) => {
    var item = Item({itemName: req.body.item});
    item.save()
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((err)=>res.status(500).send(err));
});

router.get('/', (req, res) => {
    Item.find({})
    .then((data)=>{
        data.sort(function (a, b) {
            return a.itemName.localeCompare(b.itemName);
        });
        res.status(200).send(data);
    })
    .catch((err)=>res.send(err));
});

module.exports = router