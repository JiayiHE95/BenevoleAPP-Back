const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const festivalRoutes = require("./Routes/FestivalRoutes") 
const posteRoutes = require("./Routes/PosteRoutes") 


//const bcrypt = require('bcrypt');
//const { createTokens, validateToken} =  require('./middleware/auth')


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json())// Transforme les requêtes entrantes JSON en objet JS 


// Exporte le module app pour l'utiliser dans d'autres fichiers (server.js)
app.use(express.urlencoded({extended: true})) // Permet de lire les données des strings dans les requêtes entrantes 



app.use("/festival", festivalRoutes)
app.use("/poste", posteRoutes)

app.get("/", (req,res)=>{
    res.json("Yoooo")
})


module.exports = app 
