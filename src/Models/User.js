const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const User = sequelize.define('User', {
  iduser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pseudo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  tel: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  association: {
    type: DataTypes.STRING(50),
  },
  taille_tshirt: {
    type: DataTypes.STRING(10),
  },
  est_vegetarien: {
    type: DataTypes.BOOLEAN,
  },
  hebergement: {
    type: DataTypes.STRING(50),
  },
  jeu_prefere: {
    type: DataTypes.STRING(50),
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['ADMIN', 'BENEVOLE', 'REFERENT']],
    },
  },
}, {
  tableName: 'user',timestamps:false
});

module.exports = User;

