const db = require('./database');

async function connect() {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Connection has been established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
}

module.exports = {connect};