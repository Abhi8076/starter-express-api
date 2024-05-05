const Client = require('../models/Clients');

async function findAllClient() {
    return Client.findAll();
}

async function findOneClient(id) {
    return Client.findByPk(id);
}

async function createClient(client) {
    return Client.create(client);
}

async function search_Client(query) {
    return Client.findAll({
        where: {
            $or: [
                {
                    fullname: {
                        like: '%' + query + '%'
                    },
                },
                {
                    nickname: {
                        like: '%' + query + '%'
                    },
                }
            ]
        }
    });
}

module.exports = {
    findAllClient,
    findOneClient,
    createClient,
    search_Client
}
