const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const Poste = sequelize.define('Poste', {
  idPoste: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'poste',timestamps:false
});

module.exports = Poste;
