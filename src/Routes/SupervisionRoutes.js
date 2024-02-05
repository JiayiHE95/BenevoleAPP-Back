const express = require('express')
const supervisionController = require('../Controllers/supervisonController')

const {validateToken} = require('../middleware/auth')

const router = express.Router()


router.post('/getByPoste' , supervisionController.getReferentByPoste)
router.post('/addReferent' , supervisionController.addReferent)


module.exports = router;