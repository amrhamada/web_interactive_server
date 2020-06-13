const crypto = require('crypto');
module.exports = db => {
  // get Teachers
  const generateURL = (id) => {
    const url = crypto.randomBytes(50).toString("hex");
    console.log(url)
    url;
    const query = 'INSERT INTO classroom (teacher_id, url) values ($1,$2) RETURNING id'
    const values = [id, url];
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
   deleteGame
 
  }
}
