const joi = require('joi')
const {validator} = require('../../helpers/common')

// message_purpose, worker_id, name, email, phone, desciption

const createSchema = joi.object({
  message_purpose: joi.string().required(),
  worker_id: joi.required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().min(5).max(15).pattern(/^[0-9]+$/).required(),
  desciption: joi.string().required()
})

module.exports = {
  createSchema: validator(createSchema)
}