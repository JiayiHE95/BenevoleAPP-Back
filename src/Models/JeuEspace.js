const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const JeuEspace = sequelize.define('JeuEspace', {
  
}, {
  tableName: 'jeu_espace',
  timestamps: false,
});


module.exports = JeuEspace;
