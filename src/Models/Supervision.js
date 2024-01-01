const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Supervision = sequelize.define(
  'Supervision',
  {
    iduser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idzonebenevole: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idfestival: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: 'supervision',
    timestamps: false,
  }
);



module.exports = Supervision;
