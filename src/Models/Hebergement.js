const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Hebergement = sequelize.define('Hebergement', {
  idhebergement: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  distance: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nb_places: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idfestival: {
    type: DataTypes.INTEGER,
    primaryKey: false,
  },
  description: {
    type: DataTypes.STRING(255),
    primaryKey: false,
  }
}, {
  tableName: 'hebergement',timestamps:false
});

module.exports = Hebergement;
