const express = require('express')
const userController = require('../Controllers/userController')

const { validateToken } = require('../middleware/auth')

const router = express.Router()


router.post('/inscription', userController.createUser)
router.post('/connexion', userController.login)
router.delete('/delete', userController.deleteUser)
router.get('/allusers', userController.getUsers)
router.get('/user', userController.getUser)

module.exports = router;