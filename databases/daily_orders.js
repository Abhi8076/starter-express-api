const { D_Orders } = require('../models/orders');
const mongoose = require('mongoose');

async function createOrder(order) {
    return D_Orders.create(order);
}

async function findAllDailyOrders() {
    return D_Orders.find({});
}

async function updateOrder(id, items, status) {
    return D_Orders.findByIdAndUpdate(id, {$set:{items: items, status: status}})
}

async function findOneD_Order(id) {
    return D_Orders.findById(id);
}

module.exports = {
    createOrder,
    findAllDailyOrders,
    updateOrder,
    findOneD_Order
};