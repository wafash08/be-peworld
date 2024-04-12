const {validator} = require('../../helpers/common')
const joi = require('joi')
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required()

})

module.exports = {
  loginSchema: validator(loginSchema)
}
