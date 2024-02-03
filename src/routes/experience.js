const express = require('express')
const experienceController = require('../controllers/experience')
const { protect } = require('../middlewares/auth')
const router = express.Router()
  router.post('/', protect, experienceController.create)
  router.get('/', protect, experienceController.selectAll)
  router.delete('/:id', protect, experienceController.drop)

module.exports = router