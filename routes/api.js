var express = require('express');
var router = express.Router();
const moment = require('moment');
const Uuid = require('uuid');
var multer = require('multer');

const eventsRouter = require('./events');
const calendarRouter = require('./calendar');
const friendRouter = require('./friends');
const accountRouter = require('./account');
const forgottenPasswordRouter = require('./forgottenPassword');

//reroute all calls to /api accordingly
router.get('/test', function(req, res, next) {
  res.send('server Healthy');
});

router.get('/login', function(req, res, next) {
  res.send('server Healthy');
});

router.use('/forgottenPassword', forgottenPasswordRouter);

router.use(function(req,res,next){
  if (!("user_name" in req.session)){
    res.redirect('/login');
  }else{
    next();
  }
});

router.use('/events', eventsRouter);
router.use('/calendar', calendarRouter);
router.use('/friends', friendRouter);
router.use('/account', accountRouter);


module.exports = router;