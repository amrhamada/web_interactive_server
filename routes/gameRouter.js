const express = require('express');
const router = express.Router();

module.exports = (dbHelpers) => {
/* GET teachers listing. */
  router.get("/", (req, res) => {
    dbHelpers.getAllGames()
    .then(data => {
      const games = data.rows;
      res.json( games);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
      });
  });

  router.get("/:id",(req, res) => {
    const id = req.params.id;
    Promise.all([
      dbHelpers.getGame(id),
      dbHelpers.getImagesforGame(id)
    ])
    .then((data) => {
      if (data.error) {
        return res
        .status(409)
        .json(data)
      }
      const game = data[0].rows;
      const images = data[1].rows
      res.json( {game, images})
    })
    .catch((err) => { 
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.post("/login",(req, res) => {
    const teacher = req.body;
    dbHelpers.findTeacher(teacher)
    .then((data) => {
      const professor = data.rows;
      res.json( { id:`${professor[0].id}`, 
                  first_name:`${professor[0].first_name}`,
                  last_name:`${professor[0].last_name}`,
                  email:`${professor[0].email}`,
                  avatar:`${professor[0].avatar}`,
                })
    })
    .catch((err) => { 
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;

}