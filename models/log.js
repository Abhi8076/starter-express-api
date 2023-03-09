const mongoose = require('mongoose');

const log = new mongoose.Schema({
    date: String,
    body: String
});

module.exports = mongoose.model('logs', log);