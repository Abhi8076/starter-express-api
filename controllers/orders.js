const { findOneClient } = require("../databases/client");
const { createOrder, findAllDailyOrders, findOneD_Order, updateOrder, deleteDailyOrder } = require("../databases/daily_orders");
const { findAllOrders, findByClientId, findOneOrder, createMOrder } = require("../databases/orders");
const Invoice = require('../invoice/index');

async function createDailyOrder(req, res) {
    try{
        const resp = await createOrder(req.body);
        if (resp) res.send('ok');
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getAllOrders(req, res) {
    try{
        const resp = await findAllOrders();
        if (resp) res.send(resp);
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getDailyOrders(req, res) {
    try{
        const resp = await findAllDailyOrders();
        if (resp) res.send(resp);
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function findOrderByClientId(req, res) {
    try{
        const resp = await findByClientId(req.params.id);
        if (resp) res.send(resp);
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function updateDailyOrder(req, res) {
    try {
        let temp = req.body;
        for (let i = 0; i < temp.length; i++) {
            const quantity= temp[i].quantity?temp[i].quantity:temp[i].esQuantity;
            temp[i].amount = quantity * temp[i].itemRate;
        }
        const resp = await updateOrder(req.params.id, "sent", temp);
        if (resp) res.status(200).json({status: 'done'});
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getinvoicePdf(req, res) {
    try {
        let order = await findOneOrder(req.params.id);
        if (order == null)
            order = await findOneD_Order(req.params.id);
        const client = await findOneClient(order.clientId);
        const resp = Invoice(client, order);
        if (resp) res.send({ pdf: resp });
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function doneOrder(req, res) {
    try {
        const orderId = req.params.id;
        const temp = await updateOrder(orderId, "done");
        const order = await findOneD_Order(orderId);
        let mainOrder = order.dataValues;
        mainOrder.amount = mainOrder.items.reduce((total, curr)=>{return total+curr.amount},0);
        const resp = await createMOrder(mainOrder);
        if (resp instanceof Error) {
            const temp = await updateOrder(orderId, "sent");
            res.status(422).send("something went wrong");
        }
        const temp2 = await deleteDailyOrder(orderId);
        res.json({ data: result, success: true, msg: 'Successful moved a record.' });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    createDailyOrder,
    getAllOrders,
    getDailyOrders,
    findOrderByClientId,
    updateDailyOrder,
    getinvoicePdf,
    doneOrder
};