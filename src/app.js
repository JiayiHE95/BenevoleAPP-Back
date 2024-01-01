const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const bodyParser = require('body-parser');

const festivalRoutes = require("./Routes/FestivalRoutes") 
const posteRoutes = require("./Routes/PosteRoutes") 
const userRoutes = require("./Routes/UserRoutes")
const espaceRoutes = require("./Routes/EspaceRoutes")
const fileRoutes = require("./Routes/FileRoutes")
const jeuEspaceRoutes = require("./Routes/JeuEspaceRoutes")
const posteCreneauRoutes = require("./Routes/PosteCreneauRoutes")
const flexibleRoutes = require("./Routes/FlexibleRoutes")
const inscriptionRoutes = require("./Routes/InscriptionRoutes")
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
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

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
app.use("/file",fileRoutes)
app.use("/jeu", jeuEspaceRoutes)
app.use("/poste-creneau", posteCreneauRoutes)
app.use("/flexible", flexibleRoutes)
app.use("/inscription", inscriptionRoutes)


app.get("/", (req,res)=>{
    res.json("Yoooo")
})


/*
TODO :Pour le test du csv, à déplacer
*/
//const csvController=require("./Controllers/csvController")
//csvController.importCsvToDB()

module.exports = app 
