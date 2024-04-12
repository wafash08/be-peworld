const {validator} = require('../../helpers/common')
const joi = require('joi')
// email, password, name, company, position, phone
const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
  name: joi.string().required(),
  company: joi.string().required(),
  position: joi.string().required(),
  phone: joi.string().min(5).max(15).pattern(/^[0-9]+$/).required()

})

// company, position, city, description, instagram, linkedin, phone, email, photo
const updateSchema = joi.object({
  company: joi.string().required(), 
  position: joi.string().required(), 
  city: joi.string().required(), 
  description:joi.string().required(), 
  instagram: joi.string().required(), 
  linkedin: joi.string().required(), 
  phone: joi.string().min(5).max(15).pattern(/^[0-9]+$/).required(), 
  email: joi.string().email().optional(), 
  photo: joi.string().required(), 
})

module.exports = {
  registerSchema: validator(registerSchema),
  updateSchema: validator(updateSchema)
}