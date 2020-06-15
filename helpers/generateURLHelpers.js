const crypto = require('crypto');
module.exports = db => {
  // get Teachers
  const generateURL = (id) => {
    const url = crypto.randomBytes(50).toString("hex");
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
    const querySQL = `SELECT id FROM classroom WHERE url = '${roomKey}'`
    return db.query(querySQL)
    .then(res => {
      return res
    })
    .catch(err => console.log('error', err))
  };
  // get game by id 
  const deleteRoom = (url) => {
    const querySQL = `DELETE FROM classroom WHERE url = '${url}'`
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
   deleteRoom,
   findRoom
 
  }
}
