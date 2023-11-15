const express = require('express')
const posteController = require('../Controllers/posteController')


const router = express.Router()


router.post('/creation', posteController.createPoste)
router.delete('/delete', posteController.deletePoste)
router.get('/allpostes', posteController.getAllPostes)

module.exports = router;