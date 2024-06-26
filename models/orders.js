const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Orders extends Model {}

module.exports = Orders.init({
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
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  tableName: 'orders', // We need to choose the model name
  schema: 'public',
    timestamps: true,
});

// below object come from frontend

// {
//     "clientId": "a1h2b312cv1v2v3g1v2",
//     "clientName": "abhishek",
//     "date": "20-10-2001",
//     "items": [{
//       "itemId": "ghghcghgchgchchfch",
//       "itemName": "broclie",
//       "quantity": 20,
//       "itemRate": 200,
//       "amount": 4000
//     }],
//     "status": "pending"
// }