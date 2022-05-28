var express = require('express');
var router = express.Router();
const moment = require('moment');
const Uuid = require('uuid');
var multer = require('multer');
// var upload = multer({ des: 'public/images/userUploads'});

const eventRouter = require('./events');
const calendarRouter = require('./calendar');
const friendRouter = require('./friends');
const notificationRouter = require('./notifications');

//Where multer should upload files
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/userUploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', upload.single("eventImage"), function(req, res, next){

  console.log(req.file);

  req.pool.getConnection(function(err, connection){

    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }

    let query = "INSERT INTO events (event_id, event_title, event_date, event_time, event_image, event_address, event_description) VALUES (UUID(), ?, ?, ?, ?, ?, ?)";
    connection.query(query, [req.body.eventTitle, req.body.eventDate, req.body.eventTime, req.file.path, req.body.eventAddress, req.body.eventDescription], function(error, rows, fields){
      connection.release();
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
    });

    res.redirect('/newevent');

  })
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
