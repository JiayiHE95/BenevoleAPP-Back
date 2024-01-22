const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Inscription = sequelize.define(
  'Inscription',
  {
    idinscription: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idposte: {
      type: DataTypes.INTEGER,
    },
    idcreneau: {
      type: DataTypes.INTEGER,
    },
    iduser: {
      type: DataTypes.INTEGER,
    },
    idzonebenevole: {
      type: DataTypes.INTEGER,
    }   , 
    idfestival : {
      type: DataTypes.INTEGER,
    } ,
    valide: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    tableName: 'inscription',
    timestamps: false,
  }
);


module.exports = Inscription;
