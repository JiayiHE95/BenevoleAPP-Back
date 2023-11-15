const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const JeuEspace = sequelize.define(
  'JeuEspace',
  {
    idjeu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idzonebenevole: {
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

