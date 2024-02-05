const express = require('express')
const espaceController = require('../Controllers/espaceController')

const {validateToken} = require('../middleware/auth')
const router = express.Router()


router.post('/creation', validateToken, espaceController.createEspace)
router.delete('/delete', validateToken,espaceController.deleteEspace)
router.get('/allespaces', validateToken,espaceController.getAllEspacesParent)
router.get('/get-souszone/:idzonebenevole/:idfestival/:idcreneau', validateToken,espaceController.getZonesBenevoles)

module.exports = router;