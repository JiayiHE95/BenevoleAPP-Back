const express = require('express')
const { validateToken } = require('../middleware/auth')
const fileController = require('../Controllers/fileController')


const router = express.Router()


router.post('/import-data',fileController.importFileToDB)


module.exports = router;