const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")


const Festival = sequelize.define('Festival', {
    idFestival: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_debut: {
      type: DataTypes.DATE,
    },
    date_fin: {
      type: DataTypes.DATE,
    },
    
  }, 
  {   
    tableName: 'festival',timestamps:false
  });
  
  module.exports = Festival;