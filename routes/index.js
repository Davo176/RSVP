var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
  if('session' in req)
  {
    res.json(req.session);
  }
  else
  {
    res.send('This is a test');
  }
});

let users = {
  admin1: { username: "admin1", name: "Some Admin", password: "admin" },
  user1: { username: "user1", name: "Some User", password: "user" }
};

router.post('/login', function(req, res, next) {
  console.log(req.body);
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
      let query = "SELECT * FROM users WHERE user_name = ? and password_hash = ?";
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

router.post('/signup', function(req, res, next) {
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
        if (rows.length == 1)
        {
          console.log("User Exists");
          res.sendStatus(403);
          return;
        }
      });
      let query = "INSERT INTO users (user_name, first_name, last_name, email, password_hash) VALUES (?,?,?,?,?)";
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

router.get('/', function(req, res, next) {
  res.redirect('/home');
});

router.get('/home', function(req, res, next) {
  res.sendFile('/public/home.html', { root: __dirname+"/.." });
});

router.get('/calendar', function(req, res, next) {
  res.sendFile('/public/calendar.html', { root: __dirname+"/.." });
});

router.get('/events', function(req, res, next) {
  res.sendFile('/public/events.html', { root: __dirname+"/.." });
});

router.get('/friends', function(req, res, next) {
  res.sendFile('/public/friends.html', { root: __dirname+"/.." });
});

router.get('/newevent', function(req, res, next) {
  res.sendFile('/public/newevent.html', { root: __dirname+"/.." });
});

router.get('/notifications', function(req, res, next) {
  res.sendFile('/public/notifications.html', { root: __dirname+"/.." });
});

module.exports = router;
