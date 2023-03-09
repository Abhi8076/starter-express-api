const mongoose = require('mongoose');

const client = new mongoose.Schema({
    fullname: {
        type: String,
        require: "Name required"
    },
    nickname:String,
    address:String,
    state:String,
    phnno:String
});
client.index( { fullname: "text", nickname: "text" } );

module.exports = mongoose.model('clients', client);