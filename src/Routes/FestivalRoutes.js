const express = require('express')
const festivalController = require('../Controllers/festivalController')

const {validateToken} = require('../middleware/auth')

const router = express.Router()

router.get('/get-festival-by-annee/:annee',validateToken, festivalController.getFestivalByAnnee)
router.post('/create',validateToken, festivalController.createFestival)
router.post('/delete',validateToken, festivalController.deleteFestival)
router.get('/all',validateToken, festivalController.getAllFestivals)
router.get('/:id',validateToken, festivalController.getFestivalSelection)
router.post('/update',validateToken, festivalController.updateFestival)

module.exports = router;