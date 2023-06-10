const { Order } = require('../models/orders');

async function findAllOrders() {
    return Order.find({});
}

async function findByClientId(id) {
    return Order.find({clientId: id});
}

async function findOneOrder(id) {
    return Order.findById(id);
}

module.exports = {
    findAllOrders,
    findByClientId,
    findOneOrder
};