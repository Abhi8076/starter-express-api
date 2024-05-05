const { Sequelize } = require('sequelize');

module.exports = new Sequelize('fap', 'postgres', 'Abhi8076##', {
    host: 'localhost',
    dialect: 'postgres'
});