const express = require('express')
const router = express.Router()
const  {protect} = require('../middlewares/auth') 
const portfolioController = require('../controllers/portfolio')

router.get('/', protect, portfolioController.selectAll)
router.post('/', protect, portfolioController.create)
router.delete('/:id',protect, portfolioController.drop)
router.put('/:id', protect, portfolioController.update)

module.exports = router