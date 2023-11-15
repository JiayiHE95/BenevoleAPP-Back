const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Inscription = sequelize.define(
  'Inscription',
  {
    idPoste: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idCreneau: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idFestival: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: 'inscription',
    timestamps: false,
  }
);


module.exports = Inscription;
