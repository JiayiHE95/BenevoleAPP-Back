const express = require('express')
const supervisionController = require('../Controllers/supervisonController')

const {validateToken} = require('../middleware/auth')

const router = express.Router()


router.post('/getByPoste',validateToken, supervisionController.getReferentByPoste)
router.post('/addReferent',validateToken, supervisionController.addReferent)


module.exports = router;