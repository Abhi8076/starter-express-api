const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Payment extends Model {}

module.exports = Payment.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  tableName: 'payment', // We need to choose the model name
  schema: 'public',
    timestamps: true,
});