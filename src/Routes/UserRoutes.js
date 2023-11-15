const express = require('express')
const userController = require('../Controllers/userController')


const router = express.Router()


router.post('/creation', userController.createUser)
router.delete('/delete', userController.deleteUser)
router.get('/allusers', userController.getUsers)
router.get('/user', userController.getUser)

module.exports = router;