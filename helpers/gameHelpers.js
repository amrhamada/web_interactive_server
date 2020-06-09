module.exports = db => {
  // get Teachers
  const getAllGames = () => {
    const querySQL = `SELECT b.title, b.description, c.name as subject, d.name as type, e.name as level FROM 
      games a join game_info b on a.id = b.game_id
              join subjects c on a.subject_id = c.id
              join types d on a.type_id = d.id
              join levels e on a.level_id = e.id`
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
  const getGame = (id) => {
    const querySQL = 
    `SELECT a.id, b.title, b.description, c.name as subject, d.name as type, e.name as level

    FROM 
                games a join game_info b on a.id = b.game_id
                join subjects c on a.subject_id = c.id
                join types d on a.type_id = d.id
                join levels e on a.level_id = e.id 
                where a.id= $1`

    return db.query(querySQL, [id])
    .then( res => {
      if (res.rows) {
        return  res
      } else {
      return null
      }
    })
    .catch(err => console.log('error', err))
  };
  
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
  return {
    getAllGames,
    getGame,
    getImagesforGame
 
  }
}
