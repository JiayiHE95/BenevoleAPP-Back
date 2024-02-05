const express = require('express')
const flexibleController = require('../Controllers/flexibleController')
const {validateToken} = require('../middleware/auth')
const router = express.Router()

router.post('/create',flexibleController.createFlexibleUserCreneau)
router.post('/delete', flexibleController.deleteFlexibleUserCreneau)
router.get('/all',flexibleController.getAllFlexibleUserCreneau)
router.get('/get-user-by-creneau/:idcreneau',flexibleController.getFlexibleUserByCreneau)
router.post('/get-one',flexibleController.getOne)
module.exports = router;