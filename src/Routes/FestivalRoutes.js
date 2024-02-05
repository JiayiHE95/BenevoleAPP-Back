const express = require('express')
const festivalController = require('../Controllers/festivalController')

const {validateToken} = require('../middleware/auth')

const router = express.Router()

router.get('/get-festival-by-annee/:annee', festivalController.getFestivalByAnnee)
router.post('/create',festivalController.createFestival)
router.post('/delete',festivalController.deleteFestival)
router.get('/all',festivalController.getAllFestivals)
router.get('/:id',festivalController.getFestivalSelection)
router.post('/update',festivalController.updateFestival)

module.exports = router;