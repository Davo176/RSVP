var express = require('express');
var router = express.Router();
const moment = require('moment');
const Uuid = require('uuid');

const eventRouter = require('./events');
const calendarRouter = require('./calendar');
const friendRouter = require('./friends');
const notificationRouter = require('./notifications');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('server Healthy');
});

router.get('/login', function(req, res, next) {
  res.send('server Healthy');
});

router.use('/events', eventRouter);
router.use('/calendar', calendarRouter);
router.use('/friends', friendRouter);
router.use('/notifications', friendRouter);

module.exports = router;
