const pool = require("../config/db");

const create = ({id, worker_id, skill_name})=>{
    return pool.query(
      "INSERT INTO skills(id, worker_id, skill_name)VALUES($1, $2, $3)",
      [id, worker_id, skill_name]
    );
}

const drop = (id)=>{
  return pool.query(
    "DELETE FROM skills WHERE id = $1", 
    [id]
  );
}

const selectAll = ({id}) =>{
  // console.log(id);
  return pool.query("SELECT skills.id, skills.skill_name, skills.created_at, skills.updated_at FROM skills WHERE worker_id = $1", [id])
}


module.exports = {
  create,
  drop,
  selectAll
}