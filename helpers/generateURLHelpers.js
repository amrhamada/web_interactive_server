const crypto = require('crypto');
module.exports = db => {
  // get Teachers
  const generateURL = (id) => {
    const url = crypto.randomBytes(50).toString("hex");
    console.log(url)
    url;
    const query = 'INSERT INTO classroom (teacher_id, url) values ($1,$2) RETURNING id'
    const values = [1, url];
    return db.query(query, values)
    .then(res => {
      if (res.rows) {
        return {id:res.rows[0].id, url }
      } else {
      return null
      }
    })
    .catch(err => console.log('error', err))
  };
 
  const findRoom = (roomKey) => {
    console.log("hello", roomKey)
    const querySQL = `SELECT id FROM classroom WHERE url = '${roomKey}'`
    return db.query(querySQL)
    .then(res => {
      console.log(res.rows)
      return res
    })
    .catch(err => console.log('error', err))
  };
  // get game by id 
  const deleteGame = (id, url) => {
    const querySQL = `DELETE FROM favorites WHERE url = ${url} AND teacher_id = ${id}`
    return db.query(querySQL)
    .then( res => {
      if (res.rows) {
        return  "200"
      } else {
      return null
      }
    })
    .catch(err => console.log('error amr', err))
  };
  

  return {
   generateURL,
   deleteGame,
   findRoom
 
  }
}
