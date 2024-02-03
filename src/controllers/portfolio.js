const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const users = require("../models/users");
const portfolio = require("../models/portfolio");
const create = async (req, res, next) => {
  try {
    const { application_name, link_repository, app_type, image } = req.body;
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "workers" });
    const data = {
      id: uuidv4(),
      worker_id: user.id,
      application_name,
      link_repository,
      app_type,
      image,
    };
    await portfolio.create(data);
    delete data.worker_id
    response(res, data, 201, 'penambahan skill success')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
};

const selectAll = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "workers" });
    const {rows} = await portfolio.selectAll({worker_id:user.id })

  } catch (error) {}
};

const drop = async (req, res, next) => {
  try {
    const id = req.params.id
    await portfolio.drop({id})
    response(res, {id}, 200, 'delete portfolio success')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
};

module.exports = {
  create,
  selectAll,
  drop,
};
