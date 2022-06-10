var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mysql = require('mysql');
var requestify = require('requestify');
var salt = 'RSVPWDC';

var indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

var app = express();
//give access to db connection pool
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
      let user_name = req.body.user_name;
      let password = req.body.password;
      let query = "SELECT * FROM users WHERE user_name = ? and password_hash = SHA2(?,224);";
      connection.query(query,[user_name, password+salt], function(error, rows, fields)
      {
        connection.release();
        if (error)
        {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        if (rows.length == 0)
        {
          res.sendStatus(401);
        }
        if (rows.length == 1)
        {
          req.session.user_name = rows[0].user_name;
          req.session.first_name = rows[0].first_name;
          req.session.last_name = rows[0].last_name;
          req.session.email = rows[0].email;
          res.sendStatus(200);
        }
      });

    });
  }
  else
  {
    res.sendStatus(400);
  }
});

app.post('/loginGoogle', function(req, res, next) {
  var csrf_token_cookie = req.cookies.g_csrf_token;
  var csrf_token_body = req.body.g_csrf_token;
  if (csrf_token_body != csrf_token_cookie)
  {
    res.send(400);
    return;
  }
  var token = req.body.credential;
  var url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
  requestify.get(url).then(function(response)
  {
    response.getBody();
    var info = JSON.parse(response.body);
    var email = info.email;
    var first_name = info.given_name;
    var last_name = info.family_name;
    req.pool.getConnection(function(error, connection)
    {
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
        if (error)
        {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        if (rows.length == 0)
        {
          //User doesnt exist so sign up
          var user_name = first_name + last_name + Math.floor(1000 + Math.random() * 9000);
          query2 = "INSERT INTO users (user_name, first_name, last_name, email) VALUES (?,?,?,?)"
          connection.query(query2,[user_name, first_name, last_name, email], function(error, rows, fields)
          {
            connection.release();
            req.session.user_name = user_name;
            req.session.first_name = first_name;
            req.session.last_name = last_name;
            req.session.email = email;
            res.redirect('/events');
            return;
          });
        }
        else
        {
          connection.release();
          //User exists so login
          req.session.user_name = rows[0].user_name;
          req.session.first_name = rows[0].first_name;
          req.session.last_name = rows[0].last_name;
          req.session.email = rows[0].email;
          res.redirect('/events');
          return;
        }
      });
    });
  });
});

app.post('/signup', function(req, res, next) {
  if ('user_name' in req.body && 'email' in req.body && 'password' in req.body && 'first_name' in req.body && 'last_name' in req.body)
  {
      req.pool.getConnection(function(error, connection){
      if (error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
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
          res.sendStatus(403);
          return;
        }
      });
      let query = "INSERT INTO users (user_name, first_name, last_name, email, password_hash) VALUES (?,?,?,?,SHA2(?,224))";
      connection.query(query,[user_name, first_name, last_name, email, password+salt], function(error, rows, fields)
      {
        connection.release();
        req.session.user_name = user_name;
        req.session.first_name = first_name;
        req.session.last_name = last_name;
        req.session.email = email;

        res.sendStatus(200);
      });
    });
  }
  else
  {
    res.sendStatus(400);
  }
});

app.get('/externalInvitee', function(req, res, next) {
  //Check code
  console.log(req.query);
  if (req.query.event_code != "")
  {
    req.pool.getConnection(function(error, connection)
    {
      if (error)
      {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      //Check if valid code
      let query = "SELECT * FROM users WHERE user_name = ?";
      connection.query(query,[req.query.event_code], function(error, rows, fields)
      {
        if (rows.length == 0)
        {
          console.log("Invalid code");
          res.sendStatus(403);
          res.end;
          return;
        }
        console.log("Code exists");
        //Session stuff
        console.log(rows);
        req.session.first_name = "GUEST";
        req.session.user_name = rows[0].user_name;
        //Find event invited to
        let query2 = "SELECT * FROM event_invitees WHERE invitee_id = ?";
        let id = "";
        connection.query(query2,[req.query.event_code], function(error, rows, fields)
        {
          console.log(rows);
          //Change location to that page
          res.send('/event?id='+rows[0].event_id);
        });
      });
    });
  }
  else
  {
    res.sendStatus(400)
  }
});

app.get('/login', function(req, res, next)
{
  if ('user_name' in req.session)
  {
    res.redirect('/');
  }
  else
  {
    res.sendFile('/public/login.html', { root: __dirname });
  }
});

app.use('/api', apiRouter);
app.use('/', indexRouter);



module.exports = app;
