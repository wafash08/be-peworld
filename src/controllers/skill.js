const { v4: uuidv4 } = require("uuid");
const users = require('../models/users')
const skills = require('../models/skill');
const { response } = require("../helpers/common");
const createError = require("http-errors");
const create = async(req, res, next)=>{
  try {
    const {skill_name} = req.body
    const email = req.decoded.email
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

module.exports = {
  create,
  drop,
  selectAll
}