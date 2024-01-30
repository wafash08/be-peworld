const pool = require('../config/db')
const create = ({id, email, password, role_id}) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users(id, email, password, role_id)VALUES($1, $2, $3, $4)', [id, email, password, role_id, ], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
const findByEmail = (email, {relation} = {relation: ''}) => {
  console.log(relation);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users ${relation ? `JOIN ${relation} ON users.id = user_id`: ''} WHERE email = $1 `,
      [email],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = {
  create,
  findByEmail
}