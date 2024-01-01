const express = require('express')
const espaceController = require('../Controllers/espaceController')


const router = express.Router()


router.post('/creation', espaceController.createEspace)
router.delete('/delete', espaceController.deleteEspace)
router.get('/allespaces', espaceController.getAllEspacesParent)
router.get('/get-souszone/:idzonebenevole/:idfestival/:idcreneau', espaceController.getZonesBenevoles)

module.exports = router;