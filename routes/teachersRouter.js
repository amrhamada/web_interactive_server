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
    console.log(teacher)
    database.addTeacher(teacher)
    .then((data) => {
      consol
      const regTeacher = data.rows;
      res.redirect(`/teachers/${regTeacher[0].id}`)
    })
    .catch((error) => {
      console.log(error);
    });
  });

module.exports = router;

