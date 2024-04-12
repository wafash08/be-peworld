const { v4: uuidv4 } = require("uuid");
const users = require("../../models/users");
const experience = require("../../models/experience");
const createError = require("http-errors");
const { response } = require("../../helpers/common");
const { createSchema, updateSchema } = require("./request_model");
const selectAll = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "workers" });
    const { rows } = await experience.selectAll({ worker_id: user.id });
    response(res, rows, 201, "penambahan skill success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};
const selectByWorker = async (req, res, next) => {
  try {
    const id = req.params.id
    const { rows } = await experience.selectAll({ worker_id: id });
    response(res, rows, 201, "penambahan skill success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const create = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {error, value} = createSchema(req.body)
    if(error){
      return next(new createError.BadRequest(error.details[0].message))
    }
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "workers" });
    const data = {
      id: uuidv4(),
      worker_id: user.id,
      ...value
    };
    await experience.create(data);
    delete data.worker_id;
    response(res, data, 201, "penambahan experience success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const drop = async (req, res, next) => {
  try {
    const id = req.params.id;
    await experience.drop({ id });
    response(res, { id }, 201, "delete experience success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
  const id = req.params.id;
  await experience.drop({ id });
};

const update = async (req, res, next) => {
  try {
    const {error, value} = updateSchema(req.body)
    if(error){
      return next(new createError.BadRequest(error.details[0].message))
    }
    const id = req.params.id;
    const data = {
      ...value,
      updated_at: new Date()
    };
    await experience.update(data, id);
    response(res, { id: id, ...data }, 200, "update experience success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

module.exports = {
  create,
  selectAll,
  drop,
  update,
  selectByWorker
};
