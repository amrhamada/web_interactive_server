const express = require('express');
const router = express.Router();
const database = require('../db/database');


/* GET home page. */
router.get('/', (req, res, next) =>  {
  res.render('index', { title: 'Interactive Web Server' });
});

module.exports = router;
