const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    type: String
});

module.exports = mongoose.model('users', user);