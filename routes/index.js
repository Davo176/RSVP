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
  user1: { username: "user1", name: "Some User", password: "user" },

};

router.get('/user', function(req, res, next) {
  res.send(req.session.user_name);
});

router.get('/', function(req, res, next) {
  res.redirect('/events');
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

router.get('/account', function(req, res, next){
  res.sendFile('/public/account.html', { root: __dirname+"/.."});
})

router.get('/logout', function(req, res, next){
  console.log(req.session);
  delete req.session;
  console.log(req.session);
  res.redirect('/login');
})

module.exports = router;
