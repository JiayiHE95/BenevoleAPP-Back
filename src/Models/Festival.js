const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Festival = sequelize.define("Festival", {
    idFestival: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    annee : {type: DataTypes.INTEGER, allowNull: false, primaryKey: false},
    date_debut : {type: DataTypes.DATE, allowNull: false,primaryKey: false},
    date_fin : {type: DataTypes.DATE, allowNull: false,primaryKey: false},
    resume : { type: DataTypes.TEXT, allowNull: true, primaryKey: false}
},
{ tableName: "Festival", freezeTableName: true, timestamps: false}
)



module.exports = Festival
