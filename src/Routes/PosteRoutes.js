const express = require('express')
const posteController = require('../Controllers/posteController')
const {validateToken} = require('../middleware/auth')



const router = express.Router()


router.post('/create',validateToken, posteController.createPoste)
//router.delete('/delete', posteController.deletePoste)
router.get('/allpostes',validateToken, posteController.getAllPostes)
router.get('/one',validateToken, posteController.getOnePosteById)

router.post('/update',validateToken, posteController.updatePoste)

module.exports = router;