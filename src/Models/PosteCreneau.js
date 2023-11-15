const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PosteCreneau = sequelize.define(
  'PosteCreneau',
  {
    idposte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idcreneau: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idfestival: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
