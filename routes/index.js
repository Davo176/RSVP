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

router.get('/user', function(req, res, next) {
  res.send(req.session.user_name);
});

router.get('/', function(req, res, next) {
  res.redirect('/events');
});

router.get('/event', function(req, res, next) {
  console.log(req.query);
  res.sendFile('/public/event.html', { root: __dirname+"/.." });
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
