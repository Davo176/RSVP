var express = require('express');
var router = express.Router();
const moment = require('moment');
var multer = require('multer');
var upload = multer({ des: 'public/images/userUploads'});
const Uuid = require('uuid');
const changeRouter = require('./change');
var sendMail = require('../../email')

router.use('/change', changeRouter);

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
                        events.event_id NOT IN (select event_admins.event_id from event_admins where event_admins.admin_id=?)
                        AND
                        i.invitee_id = ?;`;
        connection.query(query, [user,user,user], function(error, rows, fields) {
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
    let fileName = "test.jpg"
    if(req.file){
      fileName = req.file.filename;
    }
    let query = "INSERT INTO events (event_id, event_title, event_date, event_time, event_image, event_address, event_description, finalised) VALUES (?, ?, ?, ?, ?, ?, ?, 0)";
    connection.query(query, [eventID, eventTitle, req.body.eventDate, req.body.eventTime, fileName, req.body.eventAddress, req.body.eventDescription], function(error, rows, fields){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
    });

    let query2 = "INSERT INTO event_admins (event_id, admin_id) VALUES (?, ?)";
    connection.query(query2, [eventID, user], function(error, rows, fields){

      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
    });

    let query3 = "INSERT INTO event_invitees (event_id, invitee_id,attending_status) VALUES (?, ?,'Unsure')";
    connection.query(query3, [eventID, user], function(error, rows, fields){

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
    let query2 = "select event_title from events where event_id=?;"
    let query3 = `select users.email from events
                left join event_admins on events.event_id = event_admins.event_id
                left join users on event_admins.admin_id = users.user_name
                left join user_email_settings on users.user_name = user_email_settings.user_name
                where
                events.event_id=?
                and
                user_email_settings.setting_name='response'
                and
                user_email_settings.setting_state=1;`
    req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
      connection.query(query, [req.body.status,req.body.event_id,user], function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
        connection.query(query2, [req.body.event_id], function(error, rows, fields) {
          if (error) {
            console.log(error);
            return;
          }
          let eventTitle = rows[0].event_title;
          connection.query(query3, [req.body.event_id], function(error, rows, fields) {
            connection.release();
            if (error) {
              console.log(error);
              return;
            }
            let emailReceivers=rows;
            emailReceivers=emailReceivers.map(e => e.email);
            sendMail("Response",{eventTitle: eventTitle, newStatus:req.body.status, user:user},emailReceivers);
          });
        });
      });
    });
  }
})

router.get('/info', function(req,res,next){
  if (!('event_id' in req.query)){
    res.sendStatus(400);
    return;
  }else{
  let user=req.session.user_name;
  let event_id=req.query.event_id;
    let query=`
              select
                  e.event_id,
                  e.event_image as Image,
                  e.event_title as Title,
                  e.event_date as Date,
                  e.event_time as Time,
                  e.event_address as Address,
                  e.event_description as Description,
                  e.finalised as Finalised,
                  i.attending_status as AttendingStatus
              from event_invitees as i
              left join events as e on e.event_id = i.event_id
              where i.event_id = ? and i.invitee_id=?;
              `
    req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
      connection.query(query, [event_id,user], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        res.send(rows);
      });
    });
  }
})

router.get('/people', function(req,res,next){
  if (!('event_id' in req.query)){
      res.sendStatus(400);
      return;
    }else{
    let user=req.session.user_name;
    let event_id=req.query.event_id;
      let query=`select
                  i.invitee_id,
                  i.attending_status,
                  u.first_name,
                  u.last_name,
                  CASE
                    WHEN i.invitee_id IN (SELECT requestee from friends where friendship_start_date is not null and requester=?) then 'TRUE'
                    WHEN i.invitee_id IN (SELECT requester from friends where friendship_start_date is not null and requestee=?) then 'TRUE'
                    else FALSE
                  end as areFriends
                  from event_invitees as i
              left join users as u on i.invitee_id=u.user_name
              where event_id=?
              union
              select
                  a.admin_id,
                  'Admin',
                  u.first_name,
                  u.last_name,
                  CASE
                    WHEN a.admin_id IN (SELECT requestee from friends where friendship_start_date is not null and requester=?) then 'TRUE'
                    WHEN a.admin_id IN (SELECT requester from friends where friendship_start_date is not null and requestee=?) then 'TRUE'
                    else 'FALSE'
                  end as areFriends
              from event_admins as a
              left join users as u on a.admin_id=u.user_name
              where event_id=?;`
      req.pool.getConnection(function(error, connection){
        if(error){
          console.log(error);
          res.sendStatus(500);
          return;
        }
        connection.query(query, [user,user,event_id,user,user,event_id], function(error, rows, fields) {
          connection.release();
          if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
          }
          res.send(rows);
        });
      });
    }
})

router.get('/areAdmin', function(req,res,next){
  if (!('event_id' in req.query)){
      res.sendStatus(400);
      return;
    }else{
    let user=req.session.user_name;
    let event_id=req.query.event_id;
      let query=`select
                  admin_id
                 from
                  event_admins
                 where event_id=?;`
      req.pool.getConnection(function(error, connection){
        if(error){
          console.log(error);
          res.sendStatus(500);
          return;
        }
        connection.query(query, [event_id], function(error, rows, fields) {
          connection.release();
          if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
          }
          for (let row of rows){
            if (row.admin_id.toLowerCase() === user.toLowerCase()){
              res.send({rows: rows, you: user});
              return;
            }
          }
          res.send("False");
        });
      });
    }
})

router.post('/invite',function(req,res,next){
  if ('first_name' in req.body && 'last_name' in req.body && 'event_id' in req.body)
  {
    req.pool.getConnection(function(error, connection)
    {
      if (error)
      {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      console.log("Connected to database");
      let first_name = req.body.first_name;
      let last_name = req.body.last_name;
      let username = Uuid.v4();
      let query = "INSERT INTO users (user_name, first_name, last_name) VALUES (?,?,?)";
      connection.query(query,[username, first_name, last_name], function(error, rows, fields)
      {
        console.log("Signed up external");

      });
      let event_id = req.body.event_id;
      let query2 = "INSERT INTO event_invitees (invitee_id, event_id, attending_status) VALUES (?,?,?)";
      connection.query(query2,[username,event_id,'Unsure'], function(error, rows, fields)
      {
        connection.release();
        console.log("Added user to event table");

      });
      res.send(username);
    });
  }
  else
  {
    console.log('bad request');
    res.sendStatus(400);
  }
})


module.exports = router;
