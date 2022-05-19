var express = require('express');
var router = express.Router();

/* GET home page. */
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
