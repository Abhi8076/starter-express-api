const Payment = require('../models/payment');

async function findPaymentByClientId(id) {
    return Payment.find({clientId: id});
}

async function createPayment(pay) {
    return Payment.create(pay);
}

module.exports = {
    findPaymentByClientId,
    createPayment
};