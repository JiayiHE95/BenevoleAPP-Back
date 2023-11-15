const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Supervision = sequelize.define(
  'Supervision',
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idZoneBenevole: {
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
