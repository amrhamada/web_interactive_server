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

  router.post("/new",(req, res) => {
    database.addTeacher(teachers)
    .then((data) => {
      const teachers = data.rows;
      res.redirect(`/teachers/${teachers[0].id}`)
    })
    .catch((error) => {
      console.log(error);
    });
  });

module.exports = router;
