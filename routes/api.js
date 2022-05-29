var express = require('express');
var router = express.Router();
const moment = require('moment');
const Uuid = require('uuid');
var multer = require('multer');
// var upload = multer({ des: 'public/images/userUploads'});

const eventsRouter = require('./events');
const calendarRouter = require('./calendar');
const friendRouter = require('./friends');
const notificationRouter = require('./notifications');

router.get('/test', function(req, res, next) {
  res.send('server Healthy');
});

router.get('/login', function(req, res, next) {
  res.send('server Healthy');
});

router.use('/events', eventsRouter);
router.use('/calendar', calendarRouter);
router.use('/friends', friendRouter);
router.use('/notifications', friendRouter);

module.exports = router;
