const mongoose = require('mongoose');

const payment = new mongoose.Schema({
    clientId: String,
    date: String,
    amount: Number
});

module.exports = mongoose.model('payments', payment);