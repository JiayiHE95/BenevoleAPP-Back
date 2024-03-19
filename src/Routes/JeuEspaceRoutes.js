const express = require('express')
const jeuEspaceController = require('../Controllers/jeuEspaceController')


const {validateToken} = require('../middleware/auth')
const router = express.Router()


router.get('/all'  , jeuEspaceController.getAllJeuxByEspace)
router.get ('/get-one-by-festival/:idfestival'  , jeuEspaceController.getOneByFestival)

module.exports = router;