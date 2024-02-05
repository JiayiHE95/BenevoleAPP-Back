const express = require('express')
const posteCreneauController = require('../Controllers/posteCreneauController')

const router = express.Router()
const {validateToken} = require('../middleware/auth')

router.get('/all' , posteCreneauController.getAllPostsCreneux)
router.post('/create' , posteCreneauController.createPostCreneaux)
router.get('/get-by-festival/:idfestival' , posteCreneauController.getPostesCreneauxByFestival)
router.get('/get-creneaux-by-festival/:idfestival' , posteCreneauController.getCreneauxByFestival)
router.get('/get-poste-by-festival/:idfestival' , posteCreneauController.getAllPostsByFestivals)

router.post('/update-horaire' , posteCreneauController.updateHoraire)

router.post('/get-by-zone-festival' , posteCreneauController.getPostesCreneauxByZoneFestival)

router.post('/update-capacite' , posteCreneauController.updateCapacite)
module.exports = router;

