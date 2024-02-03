const express = require('express')
const router = express.Router()
const workersRoute = require('./workers')
const authRoute = require('./auth')
const skillRoute = require('./skill')
const experienceRoute = require('./experience')

router.use('/auth', authRoute);
router.use('/workers', workersRoute);
router.use('/skills', skillRoute)
router.use('/experience', experienceRoute)


module.exports = router