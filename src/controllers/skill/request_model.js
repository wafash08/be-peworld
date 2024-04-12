const joi = require('joi')
const {validator} = require('../../helpers/common')

const createSchema = joi.object({
  skill_name: joi.string().required()
})

module.exports = {
  createSchema: validator(createSchema)
}