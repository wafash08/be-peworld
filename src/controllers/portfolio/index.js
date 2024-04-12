const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const users = require("../../models/users");
const portfolio = require("../../models/portfolio");
const { response } = require("../../helpers/common");
const { createSchema, updateSchema } = require("./request_model");
const create = async (req, res, next) => {
  try {
    const {error, value} = createSchema(req.body)
    if(error){
      return next(new createError.BadRequest(error.details[0].message))
    }
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "workers" });
    const data = {
      id: uuidv4(),
      worker_id: user.id,
      ...value
    };
    await portfolio.create(data);
    delete data.worker_id;
    response(res, data, 201, "add portfolio success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const selectAll = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "workers" });
    const { rows } = await portfolio.selectAll({ worker_id: user.id });
    response(res, rows, 200, "get portfolio success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};
const selectByWorker = async (req, res, next) => {
  try {
    const id = req.params.id
    const { rows } = await portfolio.selectAll({ worker_id: id });
    response(res, rows, 200, "get portfolio success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const drop = async (req, res, next) => {
  try {
    const id = req.params.id;
    await portfolio.drop({ id });
    response(res, { id }, 200, "delete portfolio success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {error, value} = updateSchema(req.body)
    if(error){
      return next(new createError.BadRequest(error.details[0].message))
    }
    const data = {
      ...value,
      updated_at: new Date()
    };
    await portfolio.update(data, id)
    response(res, {id, ...data}, 200, "update portfolio success");
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
