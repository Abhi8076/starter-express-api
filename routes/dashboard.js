const express = require('express');
const { dashboardData } = require('../controllers/dashboard');
const router = express.Router();

router.get('/dashboard-data', dashboardData);

module.exports = router
