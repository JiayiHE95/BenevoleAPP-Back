const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Jeu = sequelize.define('Jeu', {
  idjeu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  editeur: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.STRING(255),
  },
  recu: {
    type: DataTypes.BOOLEAN,
  },
  aanimer: {
    type: DataTypes.BOOLEAN,
  },
  notice: {
    type: DataTypes.STRING(255),
  },
  video: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'jeu',timestamps:false
});

module.exports = Jeu;
