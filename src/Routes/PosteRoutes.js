const express = require('express')
const posteController = require('../Controllers/posteController')


const router = express.Router()


router.post('/create', posteController.createPoste)
//router.delete('/delete', posteController.deletePoste)
router.get('/allpostes', posteController.getAllPostes)
router.get('/one', posteController.getOnePosteById)

module.exports = router;