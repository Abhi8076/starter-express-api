const { createClient, findAllClient, findOneClient, search_Client } = require("../databases/client");
const { findByClientId } = require("../databases/orders");
const { findPaymentByClientId } = require("../databases/payment");

async function create_Client(req, res) {
    try{
        const resp = await createClient(req.body);
        if (resp) res.send(resp);
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function searchClient(req, res) {
    try{
        const resp = await search_Client(req.query.s);
        if (resp) res.send(resp);
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function findSingleClient(req, res) {
    try{
        const resp = await findOneClient(req.params.id);
        if (resp) res.send(resp);
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getAllClientWithoutTotal(req, res) {
    try{
        const resp = await findAllClient();
        if (resp) res.send(resp);
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getAllClients(req, res) {
    try{
        const data = await findAllClient();
        let rdata = [];
        for(let i = 0; i < data.length; i++){
            let orders = await findByClientId(data[i].id );
            let payments = await findPaymentByClientId(data[i].id);
            let total=0,paid=0;
            for(let j = 0; j < orders.length; j++){
                let sum = 0;
                for(let k = 0; k < orders[j].items.length; k++){
                    sum = sum + orders[j].items[k].amount;
                }
                total = total + sum;
            }
            for(let k=0;k<payments.length; k++){
                paid += payments[k].amount;
            }
            rdata.push({
                id: data[i].id, 
                fullname: data[i].fullname,
                nickname: data[i].nickname,
                address: data[i].address,
                state: data[i].state,
                phnno: data[i].phnno,
                total: total,
                paymentDue: total-paid,
                paid: paid
            });
        }
        if (rdata) res.send(rdata);
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    create_Client,
    searchClient,
    findSingleClient,
    getAllClientWithoutTotal,
    getAllClients
};