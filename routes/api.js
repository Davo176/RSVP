var express = require('express');
var router = express.Router();
const moment = require('moment');
const Uuid = require('uuid');

const calendarRouter = require('./calendar');
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

router.use('/calendar', calendarRouter);

module.exports = router;
