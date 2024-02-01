const express = require('express')
const inscriptionController = require('../Controllers/inscriptionController')
const router = express.Router()

router.post('/create', inscriptionController.createInscription)
router.post('/create2', inscriptionController.createInscription2)
router.post('/delete', inscriptionController.deleteInscription)
router.get('/get-by-poste-creneau', inscriptionController.getIncriptionsByPostCreneau)
router.get('/get-by-user/:iduser/:idcreneau', inscriptionController.getInscriptionsByUserCreneau)
router.get('/user/:iduser/:idfestival',inscriptionController.getInscriptionsOfUserByFestival)
router.post('/registered',inscriptionController.getRegisteredPeopleByCreneau)
router.post('/validation',inscriptionController.validateRegistration)
router.get('/get-by-festival/:idfestival',inscriptionController.getInscriptionsByFestival)
module.exports = router;
