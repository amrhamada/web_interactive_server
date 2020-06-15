// load .env data into process.env
require("dotenv").config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const cors = require('cors');

//Routes
const gameRouter = require('./routes/gameRouter');
const teachersRouter = require('./routes/teachersRouter');

const app = express();
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const { json } = require("express");
const db = new Pool(dbParams);
db.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//midleware
app.use(logger('dev'));
app.use(cors({
  origin:['http://localhost:8000'],
  credentials: true // enable set cookie
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'user-session',
  keys: ['a5376b06-97bf-4159-b737-22642a995dd4', '16aefe91-9211-4a1b-a9dc-fc738bf89e6f']
}));

//endpoint helpers
const teacherHelpers = require('./helpers/teacherHelpers')(db);
const gameHelpers = require('./helpers/gameHelpers')(db);
const roomHelpers = require("./helpers/generateURLHelpers")(db)
//endpoints
app.use('/games', gameRouter(gameHelpers));
app.use('/', teachersRouter(teacherHelpers,roomHelpers));

//websocket

const WebSocket = require('ws'),
  server = new WebSocket.Server({
    port:12345,
  });

server.students = [];
server.count = 0 ;
let state = "";

server.on('connection', (ws, req) => {
  server.count++
  console.log("User Connected")
  ws.onmessage= (event) => {
    const message = JSON.parse(event.data);
    if( message.subject === "initial" ) {
        if(server.count === 1) {
          ws.send(JSON.stringify({subject:"initial"}))
        } else {
          ws.send(JSON.stringify({subject:"welcome"}))
        }
    } else if (message.subject === "receive") {
        ws.send(JSON.stringify({subject:"state",state:JSON.parse(state)}))
    } else if(message.subject === "player_move"){
      if (state !== JSON.stringify(message.state))  {
        state = JSON.stringify(message.state)
        broadcast(ws,state)
      }
    } else if(message.subject === "setName") {
        server.students.push({student:ws, name:message.name})
        broadcastNames()

    }
  }
  ws.on('close', () => {
    server.count--;
    server.students = server.students.filter(cl => cl.student !== ws )
    broadcastNames()

  })
});

function broadcastNames() {
  server.clients.forEach(ws=>{
    ws.send(JSON.stringify({subject:"student_names", students:server.students}))
  })
}
function broadcast(cl, state) {
  server.clients.forEach(ws => {
    if (cl !== ws){
      ws.send(JSON.stringify({subject:"state",state:JSON.parse(state)}));
    }
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;