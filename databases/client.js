const Client = require('../models/clients');

async function findAllClient() {
    return Client.find({});
}

async function findOneClient(id) {
    return Client.findById(id);
}

async function createClient(client) {
    return Client.create(client);
}

async function search_Client(searchParam) {
    return Client.find(
        { $text: { $search: searchParam } },
        { score: { $meta: "textScore" } }
     ).sort( { score: { $meta: "textScore" } } );
}

module.exports = {
    findAllClient,
    findOneClient,
    createClient,
    search_Client
}
