const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const FlexibleUserCreneau = sequelize.define(
 'FlexibleUserCreneau',
 {
   iduser: {
     type: DataTypes.INTEGER,
     primaryKey: true,
   },
   idcreneau: {
     type: DataTypes.INTEGER,
     primaryKey: true,
   },
 },
 {
   tableName: 'flexible_user_creneau',
   timestamps: false,
 }
)

module.exports = FlexibleUserCreneau;