const createError = require("http-errors");
const users = require("../models/users");
const authHelper = require("../helpers/auth");
const bcrypt = require("bcryptjs");
const commonHelper = require("../helpers/common");
const fetch = require("node-fetch");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const {
      rows: [user],
    } = await users.findByEmail(email);
    if (!user) {
      return commonHelper.response(
        res,
        null,
        403,
        "email atau password anda salah"
      );
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return commonHelper.response(
        res,
        null,
        403,
        "email atau password anda salah"
      );
    }
    delete user.password;

    const payload = {
      email: user.email,
      role: user.role,
    };
    // generate token
    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.gerateRefreshToken(payload);
    res.cookie("token", user.token, {
      httpOnly: true,
      maxAge: 60 * 1000 * 60 * 12,
      secure: false,
      path: "/",
      sameSite: "Lax",
    });
    
    commonHelper.response(res, user, 201, "anda berhasil login");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const logout = async (req, res, next) => {
  res.clearCookie("token");
  commonHelper.response(res, null, 200, "Logout Success");
};
module.exports = {
  login,
  logout,
};
