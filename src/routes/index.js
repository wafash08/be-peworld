const express = require('express')
const router = express.Router()
const workersRoute = require('./workers')
const authRoute = require('./auth')

router.use('/auth', authRoute);
router.use('/workers', workersRoute);

module.exports = router