const express = require('express')
const posteCreneauController = require('../Controllers/posteCreneauController')

const router = express.Router()
const {validateToken} = require('../middleware/auth')

router.get('/all',validateToken, posteCreneauController.getAllPostsCreneux)
router.post('/create',validateToken, posteCreneauController.createPostCreneaux)
router.get('/get-by-festival/:idfestival',validateToken, posteCreneauController.getPostesCreneauxByFestival)
router.get('/get-creneaux-by-festival/:idfestival',validateToken, posteCreneauController.getCreneauxByFestival)
router.get('/get-poste-by-festival/:idfestival',validateToken, posteCreneauController.getAllPostsByFestivals)

router.post('/update-horaire',validateToken, posteCreneauController.updateHoraire)

router.post('/get-by-zone-festival',validateToken, posteCreneauController.getPostesCreneauxByZoneFestival)
module.exports = router;

