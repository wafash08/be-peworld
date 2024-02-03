const { v4: uuidv4 } = require("uuid");
const users = require("../models/users");
const experience = require("../models/experience");
const createError = require("http-errors");
const { response } = require("../helpers/common");
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

const create = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const { position, company, work_month, work_year, description } = req.body;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "workers" });
    const data = {
      id: uuidv4(),
      worker_id: user.id,
      position,
      company,
      work_month,
      work_year,
      description,
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
    const id = req.params.id;
    const { position, company, work_month, work_year, description } = req.body;
    const data = {
      position,
      company,
      work_month,
      work_year,
      description,
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
};
