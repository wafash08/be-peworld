const { v4: uuidv4 } = require("uuid");
const users = require('../../models/users')
const skills = require('../../models/skill');
const { response } = require("../../helpers/common");
const createError = require("http-errors");
const { createSchema } = require("./request_model");

const create = async(req, res, next)=>{
  try {
    const {error, value} = createSchema(req.body)
    if(error){
      return next(new createError.BadRequest(error.details[0].message))
    }
    const email = req.decoded.email
    const {skill_name} = value
    const { rows: [user] } = await users.findByEmail(email, {relation: 'workers'})
    const data = {
      id: uuidv4(),
      worker_id: user.id,
      skill_name
    }
    await skills.create(data)
    response(res, {skill_name}, 201, 'penambahan skill success')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const drop = async(req, res, next)=>{
  try {
    const id = req.params.id
    await skills.drop(id)
    response(res, {id}, 200, 'delete skill success')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const selectAll = async (req, res, next)=>{
  try {
    const email = req.decoded.email
    const { rows: [user] } = await users.findByEmail(email, {relation: 'workers'})
    const { rows }  = await skills.selectAll({id:user.id}) 
    response(res, rows, 200, 'Get skill success')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}
const selectByWorker = async (req, res, next)=>{
  try {
    const id = req.params.id
    const { rows }  = await skills.selectAll({id:id}) 
    response(res, rows, 200, 'Get skill success')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}
module.exports = {
  create,
  drop,
  selectAll,
  selectByWorker
}