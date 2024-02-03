const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const users = require("../models/users");
const recruiters = require("../models/recruiter");
const { response } = require("../helpers/common");

const register = async (req, res, next) => {
  try {
    const { email, password, name, company, position, phone } = req.body;
    const { rowCount } = await users.findByEmail(email, {
      relation: "recruiters",
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
      role: "recruiter",
    };
    const recruiter = {
      id: uuidv4(),
      user_id: user.id,
      name,
      company,
      position,
      phone,
    };
    await users.create(user);
    await recruiters.register(recruiter);
    response(res, null, 201, "user berhasil resgiter");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const update = async (req, res, next) => {
  try {
    const emailAuth = req.decoded.email;
    const { company, position, city, description, instagram, linkedin, phone, email, photo} =
      req.body;
    const {
      rows: [user],
    } = await users.findByEmail(emailAuth);
    const data = {
      company,
      position,
      city,
      description,
      instagram,
      linkedin,
      phone,
      photo
    };
    if(email && emailAuth != email){
      await users.updateEmail({email: email}, user.user_id)
    }
    await recruiters.update(data, user.user_id)
    response(res, data, 200, "update profile workers success ");
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
};

const profile = async(req, res, next) => {
  try {
    const email = req.decoded.email 
    const  { rows: [user] } = await users.findByEmail(email, {relation: 'recruiters'});
    if(!user){
      return next(new createError[403])
    }
    delete user.password
    response(res, user, 200, 'get recruiters success')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
};

module.exports = {
  register,
  update,
  profile,
};
