const express = require('express')
const flexibleController = require('../Controllers/flexibleController')
const {validateToken} = require('../middleware/auth')
const router = express.Router()

router.post('/create',validateToken,  flexibleController.createFlexibleUserCreneau)
router.post('/delete',validateToken, flexibleController.deleteFlexibleUserCreneau)
router.get('/all',validateToken, flexibleController.getAllFlexibleUserCreneau)
router.get('/get-user-by-creneau/:idcreneau',validateToken, flexibleController.getFlexibleUserByCreneau)
router.post('/get-one',validateToken, flexibleController.getOne)
module.exports = router;