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
  if ('username' in req.body && 'password' in req.body)
  {
    if(req.body.username in users && users[req.body.username].password === req.body.password)
    {
      console.log('Sucess!');
      req.session.user = users[req.body.username].username;
      res.sendStatus(200);
    }
    else
    {
      console.log('Incorrect Username/Password');
      res.sendStatus(401);
    }
  }
  else
  {
    console.log('Inproper Login Form');
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
