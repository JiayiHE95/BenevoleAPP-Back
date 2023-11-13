const http = require("http")
const { Festival } = require("./Models/models");
const sequelize = require("./config/database")
const app = require("./app")


sequelize.authenticate()
  .then(() =>{
    console.log("Database connection established")
  })
  .catch(err =>{
    console.log("error: " + err)
  })


const port = 3000
const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server is running on port ${port} at http://localhost:${port}`);
})