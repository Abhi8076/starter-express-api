const { createPayment, findPaymentByClientId } = require("../databases/payment");

async function getPaymentByClientId(req, res) {
    try{
        const resp = await findPaymentByClientId(req.params.id);
        if (resp) res.status(200).send(resp);
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

async function savePayment(req, res) {
    try{
        const resp = await createPayment(req.body);
        if (resp) res.status(200).send('ok');
        else res.status(422).send("something went wrong");
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getPaymentByClientId,
    savePayment
};