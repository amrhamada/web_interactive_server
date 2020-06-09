const bcrypt = require('bcrypt')

module.exports = db => {
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
 
  // get Teacher by email
  const getTeacherByEmail = (teacher) => {
    const querySQL = `SELECT * FROM teachers where email= $1`
    return db.query(querySQL, [teacher.email])
    .then(res => {
      if (res.rows) {
        return res
      } else {
      return null
      }
    })
    .catch(err => console.log('error', err))
  };
 
  //find a register Teacher 
  const findTeacher = (teacher) => {
    const querySQL = `SELECT * FROM teachers WHERE email = $1`
    return db.query(querySQL, [teacher.email])
    .then(res => {
      if (res.rows.length > 0) {
        const { email, password } = res.rows[0]
        if (email === teacher.email && bcrypt.compareSync(teacher.password, password)) {
          return res
        }
      } 
      return;
    })
    .catch(err => console.log('error', err))
  };
 
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
      //duplicate key value violates unique constraint https://www.postgresql.org/docs/current/errcodes-appendix.html
      if (err.code === '23505') {
        return { error:  err.detail }
      }  else {
        throw err
      }
    })
  };

  return {
    getAllTeachers,
    getTeacherByEmail,
    findTeacher,
    regTeacher
  }
}
