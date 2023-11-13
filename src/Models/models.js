const sequelize= require("../config/database")

const Festival = require("./Festival")

sequelize.sync({alter: true}).then(()=>{
    console.log("All tables synced")
})
module.exports = { Festival }