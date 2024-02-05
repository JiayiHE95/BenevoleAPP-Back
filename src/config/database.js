const { Sequelize } = require("sequelize")


//const username = process.env.DB_USERNAME || "postgres";
//const password = process.env.DB_PASSWORD || "123";
c//onst database = process.env.DB_NAME || "benevoleAppDB";

const username = process.env.DB_USERNAME || "benevole_app_bd_user";
const password = process.env.DB_PASSWORD || "9t2HHayiIYldQqeah6Vf3as80UepU7g4";
const database = process.env.DB_NAME || "benevole_app_bd";


const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});






module.exports = sequelize