const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

module.exports = (dbHelpers,gameHelpers) => {
  //* GET teachers listing. */
  router.get("/teacher/createroom", (req, res) => {
    const id = req.session.teacher_id;
    console.log("teacher id", id)
    if (id) {  
      gameHelpers.generateURL(id)
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    } else res.sendStatus(401);
  });

  router.get("/teacher/findroom", (req,res) => {
    const roomKey = req.query.id;
    const isTeacher = req.query.isTeacher;
    let teacherId;
    if (isTeacher) {
      teacherId = req.session.teacher_id;
    }
    gameHelpers.findRoom(roomKey,teacherId)
    .then(data => {
      res.json(data.rows.length > 0 )
    })
    .catch(err => {
      res
      .status(400)
      .json({ error: err.message });
    });
  });

  router.delete("/teacher/room/:url", (req, res) => {
    const id = req.session.teacher_id;
    const url = req.params.url;
    gameHelpers.deleteGame(id, url)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
      });
  });
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
  
  router.get("/teacher/games", (req, res) => {
    const teacher_id = req.session.teacher_id;
    if (!teacher_id) {
      res.redirect('/login');
    }
    dbHelpers.getTeacherGames(teacher_id)
    .then(data => {
      if (data.error){
        return res
        .status(409)
        .json(data)
      }
      const teacherGames = data.rows;
      res.json({ teacherGames });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.post("/register",(req, res) => {
    const teacher = req.body;
    teacher.password = bcrypt.hashSync(teacher.password, 10);
    dbHelpers.regTeacher(teacher)
    .then((data) => {
      if (data.error) {
        return res
        .status(409)
        .json(data)
      }
      const regTeacher = data.rows;
      req.session.teacher_id = regTeacher[0].id;
      res.json( { id:`${regTeacher[0].id}`, 
                  first_name:`${regTeacher[0].first_name}`,
                  last_name:`${regTeacher[0].last_name}`,
                  email:`${regTeacher[0].email}`,
                  avatar:`${regTeacher[0].avatar}`,
                })
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
      if (data && professor[0].email === teacher.email && bcrypt.compareSync(teacher.password, professor[0].password)) {
        req.session.teacher_id = professor[0].id;
        res.json( { id:`${professor[0].id}`, 
                    first_name:`${professor[0].first_name}`,
                    last_name:`${professor[0].last_name}`,
                    email:`${professor[0].email}`,
                    avatar:`${professor[0].avatar}`,
                  });
      } else {
        // wrong password - Unauthorized
        res.sendStatus(401)
      }
    })
    .catch((err) => { 
      res.sendStatus(400)
      .json({ error: err.message });
    });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.sendStatus(200);
  });



  return router;

}