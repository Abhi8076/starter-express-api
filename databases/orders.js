const Orders = require('../models/Orders');

async function findAllOrders() {
    return Orders.findAll();
}

async function findByClientId(id) {
    return Orders.findAll({
        where: {clientId: id}
    });
}

async function findOneOrder(id) {
    return Orders.findByPk(id);
}

async function createMOrder(id) {
    return Orders.create(id);
}

module.exports = {
    findAllOrders,
    findByClientId,
    findOneOrder,
    createMOrder
};