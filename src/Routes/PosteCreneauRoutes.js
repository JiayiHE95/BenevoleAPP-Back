const express = require('express')
const posteCreneauController = require('../Controllers/posteCreneauController')

const router = express.Router()

router.get('/all', posteCreneauController.getAllPostsCreneux)
router.post('/create', posteCreneauController.createPostCreneaux)
router.get('/get-by-festival/:idfestival', posteCreneauController.getPostesCreneauxByFestival)
router.get('/get-creneaux-by-festival/:idfestival', posteCreneauController.getCreneauxByFestival)

module.exports = router;