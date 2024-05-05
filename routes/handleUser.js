const express = require('express');
const User = require('../models/Users');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ where: {username: req.body.userName} });
        if (user.password == req.body.password) {
            let result = {
                id: user.id
            }
            res.status(200).send(result);
        }
        else res.send(null);
    } catch(err) {
        res.send(null)
    }
});

router.get('/:userid', (req, res) => {
    User.findByPk(req.params.userid)
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