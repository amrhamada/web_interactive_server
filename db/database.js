// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);
const bcrypt = require('bcrypt')
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
};
exports.getAllTeachers = getAllTeachers;

// get Teacher by email
const getTeacherByEmail = (teacher) => {
  const querySQL = `SELECT * FROM teachers where email= ${teacher.email}`
  return db.query(querySQL)
  .then(res => {
    if (res.rows) {
      return res
    } else {
    return null
    }
  })
  .catch(err => console.log('error', err))
};
exports.getTeacherByEmail = getTeacherByEmail

//find a register Teacher 
const findTeacher = (eml, pass) => {
  const querySQL = `SELECT id, email, password, avatar FROM teachers WHERE email = '${eml}'`
  return db.query(querySQL)
  .then(res => {
    if (res.rows.length > 0) {
      const {id, email, password, avatar} = res.rows[0]
      if (email === eml && bcrypt.compareSync(pass, password)) {
        return id
      }
    } 
    return;
  })
  .catch(err => console.log('error', err))
};
exports.findTeacher = findTeacher;

// Register a Teacher
const regTeacher = (teacher) => {
  const hashedPass = bcrypt.hashSync(teacher.password, 10);
  const querySQL = `INSERT INTO teachers (first_name, last_name, email, avatar, password )
  VALUES ( $1, $2, $3, $4, $5)
  RETURNING *`
  return db.query(querySQL, [teacher.first_name, teacher.last_name, teacher.email, teacher.avatar, hashedPass])
  .then(res => {
    if(res.rows){
      return res;
    } else {
      return null
    }
  })
  .catch(err => {
    //duplicate key value violates unique constraint
    if (err.code === '23505') {
      return { error:  err.detail }
    }  else {
      throw err
    }
  })
};
exports.regTeacher = regTeacher;


