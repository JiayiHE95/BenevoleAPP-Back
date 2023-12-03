const express = require('express')
const userController = require('../Controllers/userController')

const { validateToken } = require('../middleware/auth')

const router = express.Router()

router.get("/isLogged", userController.verifyJWT);
router.post('/inscription', userController.createUser)
router.post('/connexion', userController.login)
router.delete('/delete', userController.deleteUserById)
router.get('/allusers', userController.getUsers)
router.get('/get-user-by-id', userController.getUserById)
router.get("/get-user-by-mail/:mail", userController.getUserByMail);
router.get("/get-user-by-pwtoken/:token", userController.getUserByPWToken);
router.get("/check-pw-token", userController.verifyPWToken);
router.post("/password-forgot", userController.passwordForgot);
router.post("/password-reset", userController.passwordReset);

module.exports = router;