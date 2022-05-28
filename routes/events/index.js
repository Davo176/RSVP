var express = require('express');
var router = express.Router();
const moment = require('moment');
var multer = require('multer');
var upload = multer({ des: 'public/images/userUploads'});
const Uuid = require('uuid');

router.get('/invited', function(req,res,next){
    let user = req.session.user_name;
    req.pool.getConnection(function(error, connection){
        if(error){
          console.log(error);
          res.sendStatus(500);
          return;
        }

        let query = `SELECT
                        events.event_id,
                        event_title as Title,
                        event_date as Date,
                        event_time as Time,
                        event_image as Image,
                        event_address as Address,
                        event_description as Description,
                        i.attending_status as Status
                    FROM
                        events
                    INNER JOIN
                        event_invitees as i on events.event_id = i.event_id
                    WHERE
                        events.event_id IN (select event_invitees.event_id from event_invitees where event_invitees.invitee_id=?)
                        AND
                        i.invitee_id = ?;`;
        connection.query(query, [user,user], function(error, rows, fields) {
          connection.release();
          if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
          }
          res.send(rows);
        });
      });
    })

router.get('/admin', function(req,res,next){
  let user = req.session.user_name;
  req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let query = `SELECT
                      events.event_id,
                      event_title as Title,
                      event_date as Date,
                      event_time as Time,
                      event_image as Image,
                      event_address as Address,
                      event_description as Description,
                      (SELECT COUNT(event_invitees.invitee_id) FROM event_invitees WHERE events.event_id = event_invitees.event_id AND attending_status='going') as Going,
                      (SELECT COUNT(event_invitees.invitee_id) FROM event_invitees WHERE events.event_id = event_invitees.event_id AND attending_status='unsure') as Unsure,
                      (SELECT COUNT(event_invitees.invitee_id) FROM event_invitees WHERE events.event_id = event_invitees.event_id AND attending_status='not going') as Not_Going
                  FROM
                      events
                  WHERE
                      events.event_id IN (select event_admins.event_id from event_admins where event_admins.admin_id=?);`;
      connection.query(query, [user], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        res.send(rows);
      });
    });
  })

//Where multer should upload files

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/userUploads')
  },
  filename: function (req, file, cb) {
    let split = file.originalname.split(".");
    let extension = file.originalname.split(".")[split.length-1];
    cb(null, Uuid.v4() + "." + extension)
  }
})

var upload = multer({ storage: storage });

router.post('/add', upload.single("eventImage"), function(req, res, next){

  //console.log(req.file);

  req.pool.getConnection(function(err, connection){

    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }
    const eventID = Uuid.v4();
    let user = req.session.user_name;
    let eventTitle = "My Event";
    if(req.body.eventTitle){
      eventTitle = req.body.eventTitle;
    }
    let query = "INSERT INTO events (event_id, event_title, event_date, event_time, event_image, event_address, event_description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, [eventID, eventTitle, req.body.eventDate, req.body.eventTime, req.file.filename, req.body.eventAddress, req.body.eventDescription], function(error, rows, fields){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
    });

    let query2 = "INSERT INTO event_admins (event_id, admin_id) VALUES (?, ?)";
    connection.query(query2, [eventID, user], function(error, rows, fields){
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

router.post('/updateStatus', function(req,res,next){
  let user = req.session.user_name;
  if (!('status' in req.body) || !('event_id' in req.body)){

    res.sendStatus(400);
    return;
  }else{
    let query="update event_invitees set attending_status=? where event_id=? and invitee_id=?"
    req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
      connection.query(query, [req.body.status,req.body.event_id,user], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  }
})

module.exports = router;
