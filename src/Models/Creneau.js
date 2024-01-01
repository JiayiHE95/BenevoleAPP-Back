const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Creneau = sequelize.define('Creneau', {
  idcreneau: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jour: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  heure_debut: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  heure_fin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  idfestival: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'creneau',timestamps:false
});

module.exports = Creneau;
