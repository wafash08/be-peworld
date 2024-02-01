const pool = require("../config/db");

const selectAll = ({id}) =>{
  console.log(id);
  return pool.query("SELECT skills.id, skills.skill_name, skills.created_at, skills.updated_at FROM skills WHERE worker_id = $1", [id])
}

const drop = (id)=>{
  return pool.query(
    "DELETE FROM skills WHERE id = $1", 
    [id]
  );
}
const create = ({id, workerId, skillName})=>{
  return pool.query(
    "INSERT INTO skills(id, worker_id, skill_name)VALUES($1, $2, $3)",
    [id, workerId, skillName]
  );
}

module.exports = {
  selectAll,
  drop,
  create
}