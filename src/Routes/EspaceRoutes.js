const express = require('express')
const espaceController = require('../Controllers/espaceController')


const router = express.Router()


router.post('/creation', espaceController.createEspace)
router.delete('/delete', espaceController.deleteEspace)
router.get('/allespaces', espaceController.getAllEspaces)

module.exports = router;