const DailyOrders = require('../models/DailyOrders');

async function createOrder(order) {
    return DailyOrders.create(order);
}

async function findAllDailyOrders() {
    return DailyOrders.findAll();
}

async function updateOrder(id, status, items) {
    let whereObj = {};
    if(items) {
        whereObj.items = items;
    }
    if(status) {
        whereObj.status = status;
    }
    return DailyOrders.update(whereObj,
    {
        where: {id:id}
    })
}

async function findOneD_Order(id) {
    return DailyOrders.findByPk(id);
}

async function deleteDailyOrder(id) {
    return DailyOrders.destroy({where: {id:id}});
}

module.exports = {
    createOrder,
    findAllDailyOrders,
    updateOrder,
    findOneD_Order,
    deleteDailyOrder
};