const mongoose = require('mongoose');

const order = new mongoose.Schema({
    clientId: String,
    clientName: String,
    date: String,
    items: [],
    status: String
});

const Order = mongoose.model('orders', order);
const D_Orders = mongoose.model('daily_orders', order);

module.exports = { Order , D_Orders }

// below object come from frontend

// {
//     "clientId": "a1h2b312cv1v2v3g1v2",
//     "clientName": "abhishek",
//     "date": "20-10-2001",
//     "items": [{
//       "itemId": "ghghcghgchgchchfch",
//       "itemName": "broclie",
//       "quantity": 20,
//       "itemRate": 200,
//       "amount": 4000
//     }],
//     "status": "pending"
// }