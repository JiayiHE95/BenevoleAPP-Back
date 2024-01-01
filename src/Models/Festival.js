const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")


const Festival = sequelize.define('Festival', {
    idfestival: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valide: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date_debut: {
      type: DataTypes.DATE,
    },
    date_fin: {
      type: DataTypes.DATE,
    },
    nom : {
      type: DataTypes.STRING(255),
      unique: true
    }
    
  }, 
  {   
    tableName: 'festival',timestamps:false
  });
  
  module.exports = Festival;