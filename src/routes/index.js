const express = require('express')
const router = express.Router()
const workersRoute = require('./workers')
const authRoute = require('./auth')
const skillRoute = require('./skill')

router.use('/auth', authRoute);
router.use('/workers', workersRoute);
router.use('/skills', skillRoute)

module.exports = router