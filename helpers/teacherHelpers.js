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
          return res
        }
      return false;
    })
    .catch(err => console.log('error', err))
  };
 
  // Register a Teacher
  const regTeacher = (teacher) => {
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
    .catch(err => {
      //duplicate key value violates unique constraint https://www.postgresql.org/docs/current/errcodes-appendix.html
      if (err.code === '23505') {
        return { error:  err.detail }
      }  else {
        throw err
      }
    })
  };

  const getTeacherGames = (teacher_id) => {
    const querySQL = `SELECT games.id, game_info.title, 
                      game_info.description, grades.name as grade, sub.name as subject, 
                      types.name as type, levels.name as level 
                      FROM games join game_info  on games.id = game_info.game_id
                      join grades on games.grade_id = grades.id
                      join subjects sub on games.subject_id = sub.id
                      join types  on games.type_id = types.id
                      join levels  on games.level_id = levels.id
                      WHERE teacher_id = $1`
    return db.query(querySQL, [teacher_id])
    .then(res => {
      if(res.rows){
        return res;
      } else {
        return null
      }
    })
    .catch(err => console.log('error', err))
  };

  return {
    getAllTeachers,
    getTeacherByEmail,
    findTeacher,
    regTeacher,
    getTeacherGames
  }
}
