const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class DailyOrders extends Model {}

module.exports = DailyOrders.init({
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
  clientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  items: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  tableName: 'dailyOrders', // We need to choose the model name
  schema: 'public',
    timestamps: true,
});