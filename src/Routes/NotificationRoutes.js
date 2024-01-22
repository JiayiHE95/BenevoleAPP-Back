const express = require('express')
const notificationController = require('../Controllers/notificationController')
const router = express.Router()


router.post('/delete', notificationController.deleteNotification)
router.get('/get-by-user/:iduser/:idfestival',notificationController.getNotificationsOfUserByFestival)
module.exports = router;