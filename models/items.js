const mongoose = require('mongoose');

const item = new mongoose.Schema({
    itemName: String
});

module.exports = mongoose.model('items', item);