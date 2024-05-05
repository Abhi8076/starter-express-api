const Payment = require('../models/Payment');

async function findPaymentByClientId(id) {
    return Payment.findAll({
        where : {clientId: id}
    });
}

async function createPayment(pay) {
    return Payment.create(pay);
}

module.exports = {
    findPaymentByClientId,
    createPayment
};