const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Notification = sequelize.define('Notification', {
    idnotification: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  label: {
    type: DataTypes.TEXT(100),
    allowNull: false,
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idfestival: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }

  
}, {
  tableName: 'notification',
  timestamps: false
});

module.exports = Notification;

