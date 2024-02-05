const express = require('express')
const posteController = require('../Controllers/posteController')
const {validateToken} = require('../middleware/auth')



const router = express.Router()


router.post('/create' , posteController.createPoste)
//router.delete('/delete', posteController.deletePoste)
router.get('/allpostes' , posteController.getAllPostes)
router.get('/one' , posteController.getOnePosteById)

router.post('/update' , posteController.updatePoste)

module.exports = router;