const { Sequelize } = require("sequelize")


//const username = process.env.DB_USERNAME || "postgres";
//const password = process.env.DB_PASSWORD || "123";
//onst database = process.env.DB_NAME || "benevoleAppDB";

const username = process.env.DB_USERNAME || "benevole_app_bd_user";
const password = process.env.DB_PASSWORD || "9t2HHayiIYldQqeah6Vf3as80UepU7g4";
const database = process.env.DB_NAME || "benevole_app_bd";
const host = process.env.DB_HOST || "dpg-cn0ifqnqd2ns73chfr10-a.frankfurt-postgres.render.com";


{/*
const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
*/}

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  logging: false,
  ssl: true, // Activer SSL/TLS
  dialectOptions: {
    ssl: {
      require: true // Exiger une connexion SSL
    }
  }
});








module.exports = sequelize