const express = require('express');
const router = express.Router();

module.exports = (dbHelpers) => {
/* GET teachers listing. */
  router.get("/", (req, res) => {
    const userId = req.session.teacher_id;
    dbHelpers.getAllGames(userId)
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

  router.get("/getLevels",(req, res) => {
    dbHelpers.getAllLevels()
    .then((data) => {
      if (data.error) {
        return res
        .status(409)
        .json(data)
      }else {
        res.json( data.rows)
      }
    })
    .catch((err) => { 
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  router.get("/getSubjects",(req, res) => {
    dbHelpers.getAllSubjects()
    .then((data) => {
      if (data.error) {
        return res
        .status(409)
        .json(data)
      }else {
        res.json( data.rows)
      }
    })
    .catch((err) => { 
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.get("/getGrades",(req, res) => {
    dbHelpers.getAllGrades()
    .then((data) => {
      if (data.error) {
        return res
        .status(409)
        .json(data)
      }else {
        res.json( data.rows)
      }
    })
    .catch((err) => { 
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  router.get("/getTypes",(req, res) => {
    dbHelpers.getAllTypes()
    .then((data) => {
      if (data.error) {
        return res
        .status(409)
        .json(data)
      }else {
        res.json( data.rows)
      }
    })
    .catch((err) => { 
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.delete("/deletegame", (req, res) =>{
    const userId = req.session.teacher_id;
    console.log(userId);
    const gameId = req.body.id 
    if (userId) {
      dbHelpers.deleteGame(userId,gameId)
      .then((data) => {
          res.sendStatus(204);
      })
      .catch((err) => { r
        res
        .status(500)
        .json({ error: err.message });
      });
      } else {
        res.sendStatus(401)
      }
  });

  router.post("/creategame", (req, res) => {
    const data = req.body;
    const userId = req.session.teacher_id;
    if (userId) {
      dbHelpers.createGame(userId,data)
      .then(res => {
        const id = res.rows[0].id
        dbHelpers.createGameInfo(id, {title:data.title, description:data.description})
        return id
      })
      .then(id => {
        dbHelpers.createGameImages(id, data)
      })     
      .then((data) => {
         res.sendStatus(201);
      })
      .catch((err) => { r
        res
        .status(500)
        .json({ error: err.message });
      });
    } else {
      res.sendStatus(401)
    }
  });

  router.get("/:id",(req, res) => {
    const gameId = req.params.id;
    const userId = req.session.teacher_id 
    if (userId) {
        Promise.all([
        dbHelpers.getGame(userId,gameId),
        dbHelpers.getImagesforGame(gameId)
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
    } else {
      res.sendStatus(401)
    }
  });


  

  return router;
}