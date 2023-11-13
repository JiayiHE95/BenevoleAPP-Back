const { Sequelize } = require("sequelize")


const username = process.env.DB_USERNAME || "postgres";
const password = process.env.DB_PASSWORD || "123";
const database = process.env.DB_NAME || "benevoleAppDB";

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});





module.exports = sequelize