const express = require('express')
const festivalController = require('../Controllers/festivalController')


const router = express.Router()

router.get('/get-festival-by-annee/:annee', festivalController.getFestivalByAnnee)
router.post('/create', festivalController.createFestival)
router.delete('/delete', festivalController.deleteFestival)
router.get('/all', festivalController.getAllFestivals)
router.get('/current', festivalController.getFestivalEnCours)
router.post('/update', festivalController.updateFestival)

module.exports = router;