const pool = require('../config/db')
const create = ({id, message_purpose, worker_id, recruiter_id, name, email, phone, desciption})=>{
  return pool.query(
    "INSERT INTO hire(id, message_purpose, worker_id, recruiter_id, name, email, phone, desciption)VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
    [id, message_purpose, worker_id, recruiter_id, name, email, phone, desciption]
  );
}
const selectAll = ({filterBy, filterValue}) =>{
  return pool.query(`SELECT * FROM hire ${filterBy ? `WHERE ${filterBy}= $1`: ''} `, [filterValue])
}

module.exports = {
  create,
  selectAll
}