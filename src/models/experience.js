const pool = require("../config/db");

const selectAll = ({worker_id}) =>{
  return pool.query("SELECT id,  position, company, work_month, work_year, description created_at, updated_at FROM work_experience WHERE worker_id = $1", [worker_id])
}

const drop = ({id})=>{
  return pool.query(
    "DELETE FROM work_experience WHERE id = $1", 
    [id]
  );
}
const create = ({id, worker_id, position, company, work_month, work_year, description})=>{
  return pool.query(
    "INSERT INTO work_experience(id, worker_id, position, company, work_month, work_year, description)VALUES($1, $2, $3, $4, $5, $6, $7)",
    [id, worker_id, position, company, work_month, work_year, description]
  );
}

module.exports = {
  selectAll,
  drop,
  create
}