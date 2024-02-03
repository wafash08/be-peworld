const express = require('express')
const router = express.Router()
const recruiterController = require('../controllers/recruiter')
const  {protect} = require('../middlewares/auth') 

router.post('/register', recruiterController.register)
router.get('/profile',protect, recruiterController.profile)
router.put('/profile',protect, recruiterController.update)

module.exports = router