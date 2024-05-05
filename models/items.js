const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Items extends Model {}

module.exports = Items.init({
  // Model attributes are defined here
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  tableName: 'items', // We need to choose the model name
  schema: 'public',
  createdAt: false,
    timestamps: true,
});
