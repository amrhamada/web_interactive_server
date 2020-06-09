const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

module.exports = (dbHelpers) => {
  //* GET teachers listing. */
  router.get("/teachers", (req, res) => {
    dbHelpers.getAllTeachers()
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
    dbHelpers.regTeacher(teacher)
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

  router.post("/login",(req, res) => {
    const teacher = req.body;
    dbHelpers.findTeacher(teacher)
    .then((data) => {
      const professor = data.rows;
      if (professor[0].email === teacher.email && bcrypt.compareSync(teacher.password, professor[0].password)) {
        res.json( { id:`${professor[0].id}`, 
                    first_name:`${professor[0].first_name}`,
                    last_name:`${professor[0].last_name}`,
                    email:`${professor[0].email}`,
                    avatar:`${professor[0].avatar}`,
                  })
      } else {
        // wrong password - Unauthorized
        res.send(401)
      }
    })
    .catch((err) => { 
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;

}