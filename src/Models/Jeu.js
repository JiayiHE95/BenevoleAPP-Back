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
  auteur: {
    type: DataTypes.STRING(255),
  },
  editeur: {
    type: DataTypes.STRING(255),
  },
  nbjoueurs: {
    type: DataTypes.STRING(255),
  },
  agemin: {
    type: DataTypes.STRING(255),
  },
  duree: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.STRING(255),
  },
  notice: {
    type: DataTypes.STRING(255),
  },
  aanimer: {
    type: DataTypes.BOOLEAN,
  },
  recu: {
    type: DataTypes.BOOLEAN,
  },
  mecanismes: {
    type: DataTypes.STRING(255),
  },
  themes: {
    type: DataTypes.STRING(255),
  },
  tags: {
    type: DataTypes.STRING(255),
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING(255),
  },
  logo: {
    type: DataTypes.STRING(255),
  },
  video: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'jeu',timestamps:false
});

module.exports = Jeu;
