const express = require('express')
const userController = require('../Controllers/userController')

const { validateToken } = require('../middleware/auth')

const router = express.Router()

router.get("/isLogged", userController.verifyJWT);
router.post('/inscription', userController.createUser)
router.post('/connexion', userController.login)
router.delete('/delete', userController.deleteUserById)
router.post("/update-user",validateToken, userController.updateUser);
router.get('/allusers',validateToken, userController.getUsers)
router.get('/get-user-by-id/:iduser',validateToken, userController.getUserById)
router.get("/get-user-by-mail/:mail",validateToken, userController.getUserByMail);
router.get("/get-user-by-pwtoken/:token",validateToken, userController.getUserByPWToken);
router.get("/check-pw-token",validateToken, userController.verifyPWToken);
router.post("/password-forgot",validateToken, userController.passwordForgot);
router.post("/password-reset",validateToken, userController.passwordReset);
router.post("/password-check",validateToken, userController.verifyPassword);
router.post('/searchQuery',validateToken, userController.searchUsers);

module.exports = router;