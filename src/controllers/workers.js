const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const workers = require("../models/workers");
const users = require("../models/users");
const fetch = require("node-fetch");

const { response } = require("../helpers/common");
const register = async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;
    const { rowCount } = await users.findByEmail(email, {
      relation: "workers",
    });
    if (rowCount) {
      return next(createError(403, "user sudah terdaftar"));
    }
    const salt = bcrypt.genSaltSync(10);
    const passwrodHash = bcrypt.hashSync(password, salt);

    const user = {
      id: uuidv4(),
      email,
      password: passwrodHash,
      role: "worker",
    };
    const worker = {
      id: uuidv4(),
      name,
      user_id: user.id,
      phone,
    };
    await users.create(user);
    await workers.register(worker);
    fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Basic YzQ0NWRiNWMtMDkwMy00NzBlLWE3N2YtNWIzNmM4NjAwMzll",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        app_id: "aa31724e-0b8d-48c7-b3eb-1337f6070971",
        name: "Informasi worker register",
        included_segments: ["Total Subscriptions"],
        contents: { en: `${worker.name} bergabung di aplikasi peword` },
        headings: { en: "Worker Register" },
      }),
    });
    response(res, null, 201, "user berhasil resgiter");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const update = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email);
    const { name, job_desk, domicile, workplace, description } = req.body;
    const data = {
      name,
      job_desk,
      domicile,
      workplace,
      description,
    };
    await workers.update(data, user.user_id);
    response(res, data, 200, "update profile workers success ");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const profile = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "workers" });
    if (!user) {
      return next(new createError[403]());
    }
    delete user.password;
    response(res, user, 200, "get workers success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const {
      rows: [worker],
    } = await workers.findOne({ id });
    if (!worker) {
      throw new Error("Worker not found");
    }
    response(res, worker, 200, "get workers success");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const selectAll = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort || "created_at";
  const sortBy = req.query.sortBy || "DESC";
  const search = req.query.search || "";
  const offset = (page - 1) * limit;
  let result = [];
  const { rows } = await workers.findAll({
    limit,
    offset,
    search,
    sort,
    sortBy,
  });
  for (obj of rows) {
    const { rows: res } = await workers.SelectSkillWorker({ id: obj.id });
    const skills = res.map(([item]) => {
      return item;
    });
    result = [
      ...result,
      {
        ...obj,
        skills: skills,
      },
    ];
  }
  const {
    rows: [count],
  } = await workers.countWorkers({ search });
  const totalData = parseInt(count.total);
  const totalPage = Math.ceil(totalData / limit);
  const pagination = {
    currentPage: page,
    limit,
    totalData,
    totalPage,
  };
  // setTimeout(()=>{
  response(res, result, 200, "success get data workers", pagination);
  // }, 5000)
};

module.exports = {
  register,
  update,
  selectAll,
  profile,
  detail,
};
