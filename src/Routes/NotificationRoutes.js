const express = require('express')
const {validateToken} = require('../middleware/auth')
const notificationController = require('../Controllers/notificationController')
const router = express.Router()


router.post('/delete', validateToken, notificationController.deleteNotification)
router.get('/get-by-user/:iduser/:idfestival' ,validateToken ,notificationController.getNotificationsOfUserByFestival)
module.exports = router;