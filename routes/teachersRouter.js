const express = require('express');
const router = express.Router();
const database = require('../db/database');

/* GET teachers listing. */
router.get("/", (req, res) => {
  database.getAllTeachers()
  .then(data => {
    const teachers = data.rows;
    res.json({ teachers });
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
  });

  router.post("/register",(req, res) => {
    const teacher = req.body;
    database.regTeacher(teacher)
    .then((data) => {
      if (data.error) {
        return res
        .status(409)
        .json(data)
      }
      const regTeacher = data.rows;
      res.json( {id:`${regTeacher[0].id}`, email:`${regTeacher[0].email}`})
    })
    .catch((err) => { 
      res
      .status(500)
      .json({ error: err.message });
    });
  });

module.exports = router;

