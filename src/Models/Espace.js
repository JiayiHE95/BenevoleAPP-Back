
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Espace = sequelize.define(
  'Espace',
  {
    idZoneBenevole: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    idPoste: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idZonePlan: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    tableName: 'espace',
    timestamps: false,
  }
);


module.exports = Espace;


