const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const  {protect} = require('../middlewares/auth') 

router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/check-role',protect, authController.checkRole)

module.exports = router