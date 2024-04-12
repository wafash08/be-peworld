const joi = require('joi')
const {validator} = require('../../helpers/common')

// email, password, name, phone
const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
  name: joi.string().required(),
  phone: joi.string().min(5).max(15).pattern(/^[0-9]+$/).required()
})

// name, job_desk, domicile, workplace, description
const updateSchema = joi.object({
  name: joi.string().required(),
  job_desk: joi.string().required(), 
  domicile: joi.string().required(), 
  workplace: joi.string().required(),
  description: joi.string().required()
})

module.exports = {
  registerSchema: validator(registerSchema),
  updateSchema: validator(updateSchema)
}