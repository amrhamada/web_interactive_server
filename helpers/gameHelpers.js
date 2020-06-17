module.exports = db => {
  // get Teachers
  const getAllGames = (userId,games) => {
    const querySQL = `SELECT a.id, b.title, b.description, c.name as subject, d.name as type, e.name as level FROM 
      games a join game_info b on a.id = b.game_id
              join subjects c on a.subject_id = c.id
              join types d on a.type_id = d.id
              join levels e on a.level_id = e.id
              where a.teacher_id = $1 and a.id = ANY ($2)`
    return db.query(querySQL,[userId,games])
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
  const getGame = (userId,id) => {
    const querySQL = 
    `SELECT  b.title, b.description, c.name as subject, d.name as type, e.name as level

    FROM 
                games a join game_info b on a.id = b.game_id
                join subjects c on a.subject_id = c.id
                join types d on a.type_id = d.id
                join levels e on a.level_id = e.id 
                where a.id= $1 and teacher_id = $2`

    return db.query(querySQL, [id, userId])
    .then( res => {
      if (res.rows) {
        return  res
      } else {
      return null
      }
    })
    .catch(err => console.log('error', err))
  };
  
  const getAllLevels = () => {
    const query =  `SELECT * from levels`
    return db.query(query)
    .then(res => {
      if (res.rows) {
        return  res
      } else {
      return null
      }
    })
    .catch(err => console.log('error', err))
  }
  const getAllSubjects = () => {
    const query =  `SELECT * from subjects`
    return db.query(query)
    .then(res => {
      if (res.rows) {
        return  res
      } else {
      return null
      }
    })
    .catch(err => console.log('error', err))
  }
  const getAllGrades = () => {
    const query =  `SELECT * from grades`
    return db.query(query)
    .then(res => {
      if (res.rows) {
        return  res
      } else {
      return null
      }
    })
    .catch(err => console.log('error', err))
  }
  const getAllTypes= () => {
    const query =  `SELECT * from types`
    return db.query(query)
    .then(res => {
      if (res.rows) {
        return  res
      } else {
      return null
      }
    })
    .catch(err => console.log('error', err))
  }
  const getImagesforGame = (id) => {
    const query =  
      `select a.image
        from game_images a     
        where a.game_id= $1`
    return db.query(query, [id])
    .then( res => {
      if (res.rows) {
        return  res
      } else {
      return null
      }
    })
    .catch(err => console.log('error', err))
  }

  function deleteGame(teacherId, gameId) {
    return db.query(`DELETE FROM games WHERE id = ${gameId} and teacher_id = ${teacherId}`)
  };

  function createGame(teacherId, data) {
    const query = `INSERT INTO games (grade_id, subject_id, type_id, teacher_id, level_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const values = [data.grade, data.subject, data.type, teacherId, data.level];
    return db.query(query, values)
    .then(dbRes => {
      return dbRes
    })
    .catch(err => {console.log("error", err)})
  }
  function createGameInfo(gameId, {title,description}) {
    const query = `INSERT INTO game_info (game_id, title, description) VALUES ($1, $2, $3) RETURNING *;`;
    const values = [gameId, title, description];
    return db.query(query, values)
    .then(dbRes => {
      return dbRes
    })
    .catch(err => {console.log("error", err)})
  }
  function createGameImages(id, data){
    const values = [];
      let query = `INSERT INTO game_images (game_id, image) VALUES`;
      let count = 1;
      for(const image of data.images) {
        if (values.length > 0) {
          query += ',';
        }
        query += ` ($${count},$${count+1})`
        values.push(id, image);
        count += 2;
      }
      return db.query(query, values)
      .then(dbRes => {
        return dbRes
      })
      .catch(err => {console.log("error here3", err)})

  }


  return {
    getAllGames,
    getGame,
    getImagesforGame,
    getAllLevels,
    getAllSubjects,
    getAllGrades,
    getAllTypes,
    createGame,
    createGameImages,
    createGameInfo,
    deleteGame
  }
}
