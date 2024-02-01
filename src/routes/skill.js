const express = require('express')
const router = express.Router()
const  {protect} = require('../middlewares/auth') 
const skillController = require('../controllers/skill')

router.get('/', protect, skillController.selectAll)
router.post('/', protect, skillController.create)
router.delete('/:id',protect, skillController.drop)

module.exports = router