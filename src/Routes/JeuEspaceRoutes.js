const express = require('express')
const jeuEspaceController = require('../Controllers/jeuEspaceController')


const router = express.Router()


router.get('/all', jeuEspaceController.getAllJeuxByIdjeu)

module.exports = router;