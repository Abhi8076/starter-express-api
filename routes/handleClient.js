const express = require('express');
const { getAllClients, getAllClientWithoutTotal, findSingleClient, searchClient, create_Client } = require('../controllers/clients');
const router = express.Router();

// get all clients
router.get('/all', getAllClients);
router.get('/all-wot', getAllClientWithoutTotal);
router.get('/:id', findSingleClient);

// search client
router.get('/one', searchClient);

// create client
router.post('/', create_Client);

module.exports = router