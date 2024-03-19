const express = require('express')
const hebergementController = require('../Controllers/hebergementController')

const router = express.Router()
const {validateToken} = require('../middleware/auth')


// Create hébergement
router.post('/create' , hebergementController.createHebergement)

// Recup tous les hébergements du festival
router.get('/get-hebergement-by-festival/:idfestival' , hebergementController.getAllHebergementsByFestival)

//Recup tous les hébergements d'un user pour un festival
router.get('/get-hebergement-by-user/:idfestival/:iduser' , hebergementController.getAllHebergementsByUserFestival)

// Delete hébergement
router.delete('/delete/:idhebergement', validateToken, hebergementController.deleteHebergement)

module.exports = router;

