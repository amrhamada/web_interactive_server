// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);
db.connect();


// get Teachers
const getAllTeachers = () => {
  const querySQL = `SELECT * FROM teachers`
  return db.query(querySQL)
  .then(res => {
    if (res.rows) {
      return res
    } else {
    return null
    }
  })
  .catch(err => console.log('error', err))
}
exports.getAllTeachers = getAllTeachers;

// add Teacher
const addTeacher = (teacher) => {
  const querySQL = `INSERT INTO teachers (first_name, last_name, email, avatar, password )
  VALUES ( $1, $2, $3, $4, $5)
  RETURNING *`
  return db.query(querySQL, [teacher.first_name, teacher.last_name, teacher.email, teacher.avatar, teacher.password])
  .then(res => {
    if(res.rows){
      return res;
    } else {
      return null
    }
  })
  .catch(err => console.log('error', err))
}
exports.addTeacher = addTeacher;