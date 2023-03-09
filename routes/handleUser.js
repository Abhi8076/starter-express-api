const express = require('express');
const User = require('../models/users');
const router = express.Router();

router.post('/', (req, res) => {
    User.findOne({ username: req.body.userName })
        .then((user) => {
            if (user.password == req.body.password) {
                let result = {
                    _id: user.id
                }
                res.status(200).send(result);
            }
            else res.send(null);
        })
        .catch((err) => res.send(null));
});

router.get('/:userid', (req, res) => {
    User.findById(req.params.userid)
        .then((user) => {
            let result = {
                _id: user.id,
                username: user.username,
                name: user.name,
                type: user.type
            }
            res.send(result);
        })
        .catch((err) => res.send(null));
});

module.exports = router