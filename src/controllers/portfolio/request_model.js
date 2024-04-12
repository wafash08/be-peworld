const joi = require('joi')
const {validator} = require('../../helpers/common')


//  application_name, link_repository, application, image
const createSchema = joi.object({
  application_name: joi.string().required(),
  link_repository: joi.string().required(),
  application: joi.string().valid('Aplikasi Web', 'Aplikasi Mobile'),
  image:joi.string().required()
})

const updateSchema = joi.object({
  application_name: joi.string().required(),
  link_repository: joi.string().required(),
  application: joi.string().valid('Aplikasi Web', 'Aplikasi Mobile'),
  image:joi.string().required()
})

module.exports = {
  createSchema: validator(createSchema),
  updateSchema: validator(updateSchema)
}