const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Avis = sequelize.define('Avis', {
  idavis: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  texte: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idfestival: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'avis',timestamps:false
});

module.exports = Avis;
