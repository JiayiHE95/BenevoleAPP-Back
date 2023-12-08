const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const festivalRoutes = require("./Routes/FestivalRoutes") 
const posteRoutes = require("./Routes/PosteRoutes") 
const userRoutes = require("./Routes/UserRoutes")
const espaceRoutes = require("./Routes/EspaceRoutes")


//const bcrypt = require('bcrypt');
//const { createTokens, validateToken} =  require('./middleware/auth')


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json())// Transforme les requêtes entrantes JSON en objet JS 
var corsOptions = {
    origin: '*',
    credentials:true, 
  }
  
app.use(cors(corsOptions))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
   });

// Exporte le module app pour l'utiliser dans d'autres fichiers (server.js)
app.use(express.urlencoded({extended: true})) // Permet de lire les données des strings dans les requêtes entrantes 

app.use("/festival", festivalRoutes)
app.use("/poste", posteRoutes)
app.use("/user", userRoutes)
app.use("/espace",espaceRoutes)

app.get("/", (req,res)=>{
    res.json("Yoooo")
})


/*
TODO :Pour le test du csv, à déplacer
*/
//const csvController=require("./Controllers/csvController")
//csvController.importCsvToDB()

module.exports = app 
