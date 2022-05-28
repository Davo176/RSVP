var express = require('express');
var router = express.Router();
const moment = require('moment');

router.get('/', function(req,res,next){
    let user = req.session.user_name;
    req.pool.getConnection(function(error, connection){
        if(error){
          console.log(error);
          res.sendStatus(500);
          return;
        }

        let query = `SELECT
                        events.event_id,
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
                        events.event_id IN (select event_invitees.event_id from event_invitees where event_invitees.invitee_id=?);`;
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

module.exports = router;
