const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const users = require("../models/users");
const hire = require('../models/hire')
const { response } = require("../helpers/common");
const create = async (req, res, next) => {
  try {
    const { message_purpose, worker_id, name, email, phone, desciption } = req.body;
    const emailRecruiter = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(emailRecruiter, { relation: "recruiters" });
    const data = {
      id: uuidv4(),
      message_purpose,
      recruiter_id: user.id,
      worker_id,
      name,
      email,
      phone,
      desciption
    };
    await hire.create(data);
    response(res, data, 201, "create hire success");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const selectByWorker = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "workers" });
    const { rows } = await hire.selectAll({filterBy: 'worker_id', filterValue: user.id});
    response(res, rows, 200, "get hire with workers success");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const selectByRecruiters = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "recruiters" });
    const { rows } = await hire.selectAll({filterBy: 'recruiter_id', filterValue: user.id});
    response(res, rows, 200, "get hire with workers success");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = {
  create,
  selectByWorker,
  selectByRecruiters
}