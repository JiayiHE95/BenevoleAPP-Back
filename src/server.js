const http = require("http")
const { Festival , Creneau, Jeu, JeuEspace,Poste,PosteCreneau,Inscription,Supervision, User } = require("./Models/models");
const sequelize = require("./config/database")
const app = require("./app")


sequelize.authenticate()
  .then(() =>{
    console.log("Database connection established")
  })
  .catch(err =>{
    console.log("error: " + err)
  })


const port = 3005
const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server is running`);
})