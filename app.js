var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mysql = require('mysql');
var requestify = require('requestify');

var indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');

var app = express();

var dbConnectionPool = mysql.createPool({ host: 'localhost',database: 'production'});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req,res,next){
  req.pool = dbConnectionPool;
  next();
});

app.use(session({
    secret: 'IanKnight',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', function(req, res, next) {
  if ('user_name' in req.body && 'password' in req.body)
  {
    req.pool.getConnection(function(error, connection)
    {
      if (error)
      {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      console.log("Connected to database");
      let user_name = req.body.user_name;
      let password = req.body.password;
      console.log(req.body);
      let query = "SELECT * FROM users WHERE user_name = ? and password_hash = SHA2(?,224);";
      connection.query(query,[user_name, password], function(error, rows, fields)
      {
        console.log("Got query");
        connection.release();
        if (error)
        {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        if (rows.length == 0)
        {
          console.log('Incorrect Username/Password');
          res.sendStatus(401);
        }
        if (rows.length == 1)
        {
          console.log('Logged In');
          req.session.user_name = rows[0].user_name;
          req.session.first_name = rows[0].first_name;
          req.session.last_name = rows[0].last_name;
          req.session.email = rows[0].email;
          console.log(req.session);
          res.sendStatus(200);
        }
      });

    });
  }
  else
  {
    console.log('Inproper Login Form');
    res.sendStatus(400);
  }
});

app.post('/loginGoogle', function(req, res, next) {
  //console.log(req.cookies.g_csrf_token);
  //console.log(req.body.g_csrf_token);
  var csrf_token_cookie = req.cookies.g_csrf_token;
  var csrf_token_body = req.body.g_csrf_token;
  if (csrf_token_body != csrf_token_cookie)
  {
    console.log('Failed to verify double submit cookie.')
    res.send(400);
    return;
  }
  var token = req.body.credential;
  var url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
  //console.log(url);
  requestify.get(url).then(function(response)
  {
    response.getBody();
    var info = JSON.parse(response.body);
    console.log(info);
    var email = info.email;
    var first_name = info.given_name;
    var last_name = info.family_name;
    req.pool.getConnection(function(error, connection)
    {
      console.log("Connected to db");
      if (error)
      {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      //Check if user has signed up before
      query1 = 'SELECT * FROM users WHERE email = ?'
      connection.query(query1,[info.email], function(error, rows, fields)
      {
        console.log("Got query");
        if (error)
        {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        console.log(rows);
        if (rows.length == 0)
        {
          //User doesnt exist so sign up
          console.log("Signing Google user up");
          var user_name = first_name + last_name + Math.floor(1000 + Math.random() * 9000);
          query2 = "INSERT INTO users (user_name, first_name, last_name, email) VALUES (?,?,?,?)"
          connection.query(query2,[user_name, first_name, last_name, email], function(error, rows, fields)
          {
            connection.release();
            console.log("Signed up");
            req.session.user_name = user_name;
            req.session.first_name = first_name;
            req.session.last_name = last_name;
            req.session.email = email;
            console.log(req.session);
            res.sendStatus(200);
          });
          res.redirect('/events');
          return;
        }
        else
        {
          connection.release();
          //User exists so login
          console.log("Logging Google user in");
          console.log(rows[0]);
          req.session.user_name = rows[0].user_name;
          req.session.first_name = rows[0].first_name;
          req.session.last_name = rows[0].last_name;
          req.session.email = rows[0].email;
          console.log(req.session);
          res.redirect('/events');
          return;
        }
      });
    });
  });
});

app.post('/signup', function(req, res, next) {
  console.log(req.body);

  if ('user_name' in req.body && 'email' in req.body && 'password' in req.body && 'first_name' in req.body && 'last_name' in req.body)
  {
    req.pool.getConnection(function(error, connection)
    {
      if (error)
      {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      console.log("Connected to database");
      let user_name = req.body.user_name;
      let email = req.body.email;
      let password = req.body.password;
      let first_name = req.body.first_name;
      let last_name = req.body.last_name;
      let check = "SELECT * FROM users WHERE user_name = ?";
      connection.query(check,[user_name], function(error, rows, fields)
      {
        console.log(rows);
        if (rows.length == 1)
        {
          console.log("User Exists");
          res.sendStatus(403);
          return;
        }
      });
      let query = "INSERT INTO users (user_name, first_name, last_name, email, password_hash) VALUES (?,?,?,?,SHA2(?,224))";
      connection.query(query,[user_name, first_name, last_name, email, password], function(error, rows, fields)
      {
        connection.release();
        console.log("Signed up");
        req.session.user_name = user_name;
        req.session.first_name = first_name;
        req.session.last_name = last_name;
        req.session.email = email;
        console.log(req.session);
        res.sendStatus(200);
      });
    });
  }
  else
  {
    console.log('bad request');
    res.sendStatus(400);
  }
});

app.get('/login', function(req, res, next) {
  res.sendFile('/public/login.html', { root: __dirname });
});

app.use(function(req,res,next){
  if (!("user_name" in req.session)){
    res.redirect('/login');
  }else{
    next();
  }
})

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

module.exports = app;
