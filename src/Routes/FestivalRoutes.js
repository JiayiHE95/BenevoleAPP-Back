const express = require('express')
const festivalController = require('../Controllers/festivalController')


const router = express.Router()


router.post('/creation', festivalController.createFestival)
router.delete('/delete', festivalController.deleteFestival)
router.get('/allfestivals', festivalController.getAllFestivals)

module.exports = router;