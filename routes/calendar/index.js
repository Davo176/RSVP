var express = require('express');
var router = express.Router();
const moment = require('moment');
const Uuid = require('uuid');



router.get('/', function(req,res,next){
  if (req.query.month == undefined || req.query.year==undefined){
    res.sendStatus(400);
  }else{
    let user = req.session.user_name;
    let month = req.query.month;
    let year = req.query.year;
    req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let query = "select unavailability_id, unavailable_from, unavailable_to, reason from unavailabilities where user= ? AND MONTH(unavailable_from)=? AND MONTH(unavailable_to)=? AND YEAR(unavailable_from)=? AND YEAR(unavailable_to)=?";
      connection.query(query, [user,month,month,year,year], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        let requestMonth =  moment(`${year}-${month}-01`,"YYYY-M-DD");
        let monthStart = moment(`${year}-${month}-01`,"YYYY-M-DD");
        let reachedEndOfMonth = false;
        let reachedStartOfMonth = true;
        while (monthStart.day()!=0){
          reachedStartOfMonth = false;
          monthStart.subtract(1, 'days');
        }
        let calendar = {
          month: requestMonth.format('MMMM'),
          year: requestMonth.format('YYYY'),
          days: [
            {
              dayName:"Sunday",
              dates:[],
            },
            {
              dayName:"Monday",
              dates:[],
            },
            {
              dayName:"Tuesday",
              dates:[],
            },
            {
              dayName:"Wednesday",
              dates:[],
            },
            {
              dayName:"Thursday",
              dates:[],
            },
            {
              dayName:"Friday",
              dates:[],
            },
            {
              dayName:"Saturday",
              dates:[],
            },
          ]
        }
        while(!(reachedEndOfMonth && monthStart.day()==0)){
          let currObj = {date: monthStart.format('DD'),
                        blank:false,
                        events:[]}
          if (!reachedStartOfMonth || reachedEndOfMonth){
            currObj.blank=true;
          }
          for (let row of rows){
            if (moment(row.unavailable_from).format("YYYY-MM-DD") == monthStart.format("YYYY-MM-DD")){
              row.unavailable_from = moment(row.unavailable_from).format("HH:mm A");
              row.unavailable_to = moment(row.unavailable_to).format("HH:mm A");
              currObj.events.push(row);
              rows.splice(rows.indexOf(row), 1);
            }
          }
          calendar.days[monthStart.day()].dates.push(currObj);
          monthStart.add(1,'days');
          if (moment(`${year}-${month}-01`,"YYYY-M-DD").add(1,'month').startOf('month').format("YYYY-MM-DD")==monthStart.format("YYYY-MM-DD")){
            reachedEndOfMonth=true;
          }
          if (moment(`${year}-${month}-01`,"YYYY-M-DD").startOf('month').format("YYYY-MM-DD")==monthStart.format("YYYY-MM-DD")){
            reachedStartOfMonth=true;
          }

        }
        res.json(calendar);
      });
    });
  }
});

router.post('/add', function(req,res,next){
  if (!('date' in req.body) || !('unavailable_from' in req.body) || !('unavailable_to' in req.body) || !('reason' in req.body)){
    res.sendStatus(400);
    return;
  }else{
    let user = req.session.user_name;
    console.log(req.session);
    //console.log(user);
    let unavailableFrom = moment(req.body.date + ' ' + req.body.unavailable_from,"YYYY-MM-DD HH:mm");
    let unavailableTo = moment(req.body.date + ' ' + req.body.unavailable_to,"YYYY-MM-DD HH:mm");
    let reason = req.body.reason;
    const unavailabilityID = Uuid.v4();
    req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let query = "insert into unavailabilities (unavailability_id,unavailable_from,unavailable_to,reason,user,event_id) values (?,?,?,?,?,?)";
      connection.query(query, [unavailabilityID,unavailableFrom.format(),unavailableTo.format(),reason,user,null], function(error, rows, fields) {
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
});

router.post('/delete', function(req,res,next){
  if (!('id' in req.body)){
    res.sendStatus(400);
    return;
  }else{
    let user = req.session.user_name;
    req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
      let unavailabilityID = req.body.id;
      let query = "delete from unavailabilities where unavailability_id=? and user=?";
      connection.query(query, [unavailabilityID, user], function(error, rows, fields) {
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