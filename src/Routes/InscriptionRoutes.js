const express = require('express')
const inscriptionController = require('../Controllers/inscriptionController')
const router = express.Router()

router.post('/create', inscriptionController.createInscription)
router.post('/delete', inscriptionController.deleteInscription)
router.get('/get-by-poste-creneau', inscriptionController.getIncriptionsByPostCreneau)
router.get('/get-by-user/:iduser/:idcreneau', inscriptionController.getInscriptionsByUserCreneau)

module.exports = router;
