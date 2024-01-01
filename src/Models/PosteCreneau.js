const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PosteCreneau = sequelize.define(
  'PosteCreneau',
  {
    idpc:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idposte: {
      type: DataTypes.INTEGER,
    },
    idcreneau: {
      type: DataTypes.INTEGER,
    },
    idzonebenevole: {
      type: DataTypes.INTEGER,
   
    },
    capacite: {
      type: DataTypes.INTEGER,
    },
    capacite_restante: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'poste_creneau',
    timestamps: false,
  }
);



module.exports = PosteCreneau;
