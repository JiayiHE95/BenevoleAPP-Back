const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

//const bcrypt = require('bcrypt');
//const { createTokens, validateToken} =  require('./middleware/auth')


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json())// Transforme les requêtes entrantes JSON en objet JS 


// Exporte le module app pour l'utiliser dans d'autres fichiers (server.js)
app.use(express.urlencoded({extended: true})) // Permet de lire les données des strings dans les requêtes entrantes 

app.get("/", (req,res)=>{
    res.json("Hello")
})


module.exports = app 
