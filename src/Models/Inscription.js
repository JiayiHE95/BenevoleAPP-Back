const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Inscription = sequelize.define(
  'Inscription',
  {
    idposte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idcreneau: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    iduser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idzonebenevole: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }   , 
    valide: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    tableName: 'inscription',
    timestamps: false,
  }
);


module.exports = Inscription;
