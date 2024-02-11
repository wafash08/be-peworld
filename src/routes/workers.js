const express = require('express')
const router = express.Router()
const workerController = require('../controllers/workers')
const  {protect} = require('../middlewares/auth') 

router.post('/register', workerController.register)
router.get('/', protect, workerController.selectAll)

router.get('/profile',protect, workerController.profile)
router.put('/profile',protect, workerController.update)
router.get('/:id', workerController.detail)

module.exports = router