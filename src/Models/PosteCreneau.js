const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PosteCreneau = sequelize.define(
  'PosteCreneau',
  {
    idPoste: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idCreneau: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idFestival: {
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
