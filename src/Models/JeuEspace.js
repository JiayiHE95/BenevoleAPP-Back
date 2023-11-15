const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const JeuEspace = sequelize.define(
  'JeuEspace',
  {
    idJeu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idZoneBenevole: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: 'jeu_espace',
    timestamps: false,
  }
);


module.exports = JeuEspace;

