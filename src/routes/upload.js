const express = require('express')
const router = express.Router()
const  {protect} = require('../middlewares/auth') 
const uploadController = require('../controllers/upload')
const upload = require('../middlewares/upload')


router.post('/', upload.single('file'), uploadController.uploadSingle)


module.exports = router