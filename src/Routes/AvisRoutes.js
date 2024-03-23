const express = require('express');
const avisController = require('../Controllers/avisController'); 
const router = express.Router();

const {validateToken} = require('../middleware/auth')


router.get('/get-all-avis/:idfestival', validateToken, avisController.getAllAvis);
router.get('/:iduser', validateToken,  avisController.getAvisByUser);
router.post('/create', validateToken,  avisController.createAvis);
router.put('/:idavis', validateToken,  avisController.updateAvis);
router.delete('/delete/:idavis', validateToken, avisController.deleteAvis);

module.exports = router;
