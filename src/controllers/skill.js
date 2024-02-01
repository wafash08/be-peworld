const { v4: uuidv4 } = require("uuid");
const users = require('../models/users')
const skills = require('../models/skill');
const { response } = require("../helpers/common");
const create = async(req, res, next)=>{
  try {
    const {skillName} = req.body
    const email = req.decoded.email
    const { rows: [user] } = await users.findByEmail(email, {relation: 'workers'})
    const data = {
      id: uuidv4(),
      workerId: user.id,
      skillName
    }
    console.log(data);
    await skills.create(data)
    response(res, {skillName}, 201, 'penambahan skill success')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const drop = async(req, res, next)=>{
  try {
    const id = req.params.id
    await skills.drop(id)
    response(res, {id}, 201, 'delete skill success')
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