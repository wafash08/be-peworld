const joi = require('joi')
const {validator} = require('../../helpers/common')

const createSchema = joi.object({
  position: joi.string().required(),
  company: joi.string().required(),
  work_month: joi.string().required(),
  work_year: joi.required(),
  description: joi.string().required()
})


// position, company, work_month, work_year, description
const updateSchema = joi.object({
  position: joi.string().required(),
  company: joi.string().required(),
  work_month: joi.string().required(),
  work_year: joi.required(),
  description: joi.string().required()
})

module.exports = {
  createSchema: validator(createSchema),
  updateSchema: validator(updateSchema)
}