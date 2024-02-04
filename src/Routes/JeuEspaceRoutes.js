const express = require('express')
const jeuEspaceController = require('../Controllers/jeuEspaceController')


const {validateToken} = require('../middleware/auth')
const router = express.Router()


router.get('/all',validateToken, jeuEspaceController.getAllJeuxByEspace)
router.get ('/get-one-by-festival/:idfestival',validateToken, jeuEspaceController.getOneByFestival)

module.exports = router;