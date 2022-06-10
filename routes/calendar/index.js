var express = require('express');
var router = express.Router();
const moment = require('moment');
const Uuid = require('uuid');
const {google} = require('googleapis');
const readline = require('readline');

router.get('/', function (req, res, next) {
  //make sure month and year are in query
  if (req.query.month == undefined || req.query.year == undefined) {
    res.sendStatus(400);
  } else {
    //Get User Name Year and Month
    let user = req.session.user_name;
    let month = req.query.month;
    let year = req.query.year;
    //make a connection
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      //get users availability
      let query = "select unavailability_id, unavailable_from, unavailable_to, reason,origin from unavailabilities where user= ? AND MONTH(unavailable_from)=? AND MONTH(unavailable_to)=? AND YEAR(unavailable_from)=? AND YEAR(unavailable_to)=? order by unavailable_from";
      connection.query(query, [user, month, month, year, year], function (error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        //Set up vars
        let requestMonth = moment(`${year}-${month}-01`, "YYYY-M-DD");
        let monthStart = moment(`${year}-${month}-01`, "YYYY-M-DD");
        let reachedEndOfMonth = false;
        let reachedStartOfMonth = true;
        //get to first sunday before start of month
        while (monthStart.day() != 0) {
          reachedStartOfMonth = false;
          monthStart.subtract(1, 'days');
        }
        //setup return js object
        let calendar = {
          month: requestMonth.format('MMMM'),
          year: requestMonth.format('YYYY'),
          days: [
            {
              dayName: "Sunday",
              dates: [],
            },
            {
              dayName: "Monday",
              dates: [],
            },
            {
              dayName: "Tuesday",
              dates: [],
            },
            {
              dayName: "Wednesday",
              dates: [],
            },
            {
              dayName: "Thursday",
              dates: [],
            },
            {
              dayName: "Friday",
              dates: [],
            },
            {
              dayName: "Saturday",
              dates: [],
            },
          ]
        };

        //loop until end of month and a sunday
        while (!(reachedEndOfMonth && monthStart.day() == 0)) {
          let currObj = {
            date: monthStart.format('DD'),
            blank: false,
            events: []
          };
          if (!reachedStartOfMonth || reachedEndOfMonth) {
            currObj.blank = true;
          }
          //add each row to the object
          for (let row of rows) {
            //console.log(moment(row.unavailable_from).format("YYYY-MM-DD"), monthStart.format("YYYY-MM-DD"),moment(row.unavailable_from).format("YYYY-MM-DD") == monthStart.format("YYYY-MM-DD"))
            if (moment(row.unavailable_from).format("YYYY-MM-DD") == monthStart.format("YYYY-MM-DD")&&!row.included) {
              row.included = true;
              currObj.events.push(row);
            }
          }

          calendar.days[monthStart.day()].dates.push(currObj);
          //increment days and check if in month / out of month
          monthStart.add(1, 'days');
          if (moment(`${year}-${month}-01`, "YYYY-M-DD").add(1, 'month').startOf('month').format("YYYY-MM-DD") == monthStart.format("YYYY-MM-DD")) {
            reachedEndOfMonth = true;
          }
          if (moment(`${year}-${month}-01`, "YYYY-M-DD").startOf('month').format("YYYY-MM-DD") == monthStart.format("YYYY-MM-DD")) {
            reachedStartOfMonth = true;
          }

        }

        //Reply calendar
        res.json(calendar);
      });
    });
  }
});

//Add another unavailability
router.post('/add', function (req, res, next) {
  if (!('date' in req.body) || !('unavailable_from' in req.body) || !('unavailable_to' in req.body) || !('reason' in req.body) || !('origin' in req.body)) {
    res.sendStatus(400);
    return;
  } else {
    let user = req.session.user_name;
    let unavailableFrom = moment(req.body.date + ' ' + req.body.unavailable_from, "YYYY-MM-DD HH:mm");
    let unavailableTo = moment(req.body.date + ' ' + req.body.unavailable_to, "YYYY-MM-DD HH:mm");
    let reason = req.body.reason;
    let origin = req.body.origin;
    const unavailabilityID = Uuid.v4();
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let query = "insert into unavailabilities (unavailability_id,unavailable_from,unavailable_to,reason,user,event_id,origin) values (?,?,?,?,?,?,?)";
      connection.query(query, [unavailabilityID, unavailableFrom.format(), unavailableTo.format(), reason, user, null,origin], function (error, rows, fields) {
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

//delete an unavailability
router.post('/delete', function (req, res, next) {
  if (!('id' in req.body)) {
    res.sendStatus(400);
    return;
  } else {
    let user = req.session.user_name;
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      let unavailabilityID = req.body.id;
      let query = "delete from unavailabilities where unavailability_id=? and user=?";
      connection.query(query, [unavailabilityID, user], function (error, rows, fields) {
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

router.post('/clearExternal', function (req,res, next){
  if (!('month' in req.body)){
    res.sendStatus(400);
  }else{
    let user = req.session.user_name;
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      let month = moment(req.body.month);
      let startOfMonth = moment(month).startOf('month').format("YYYY-MM-DD HH:mm");
      let endOfMonth = moment(month).endOf('month').format("YYYY-MM-DD HH:mm");
      let unavailabilityID = req.body.id;
      let query = "delete from unavailabilities where origin='external' and user=? and unavailable_from > ? and unavailable_from <?";
      connection.query(query, [user,startOfMonth,endOfMonth], function (error, rows, fields) {
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

router.post('/addExternal', function (req, res, next) {
  if (!('unavailable_from' in req.body) || !('unavailable_to' in req.body) || !('reason' in req.body) || !('origin' in req.body)) {
    res.sendStatus(400);
    return;
  } else {
    let user = req.session.user_name;
    let unavailableFrom = moment(req.body.unavailable_from);
    let unavailableTo = moment(req.body.unavailable_to);
    let reason = req.body.reason;
    let origin = req.body.origin;
    const unavailabilityID = Uuid.v4();
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let query = "insert into unavailabilities (unavailability_id,unavailable_from,unavailable_to,reason,user,event_id,origin) values (?,?,?,?,?,?,?)";
      connection.query(query, [unavailabilityID, unavailableFrom.format("YYYY-MM-DD HH:mm"), unavailableTo.format("YYYY-MM-DD HH:mm"), reason, user, null,origin], function (error, rows, fields) {
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

router.post('/addEvent', function (req, res, next) {
  if (!('unavailable_from' in req.body) || !('unavailable_to' in req.body) || !('reason' in req.body) || !('origin' in req.body)) {
    res.sendStatus(400);
    return;
  } else {
    let user = req.session.user_name;
    let unavailableFrom = moment(req.body.unavailable_from);
    let unavailableTo = moment(req.body.unavailable_to);
    let reason = req.body.reason;
    let origin = req.body.origin;
    let event_id = req.body.event_id;
    const unavailabilityID = Uuid.v4();
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let query = "insert into unavailabilities (unavailability_id,unavailable_from,unavailable_to,reason,user,event_id,origin) values (?,?,?,?,?,?,?)";
      connection.query(query, [unavailabilityID, unavailableFrom.format("YYYY-MM-DD HH:mm"), unavailableTo.format("YYYY-MM-DD HH:mm"), reason, user, event_id,origin], function (error, rows, fields) {
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

router.post('/setOriginExternal', function (req, res, next) {
  if (!('id' in req.body)) {
    res.sendStatus(400);
    return;
  } else {
    let user = req.session.user_name;
    let id = req.body.id;
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let query = "update unavailabilities set origin = 'external' where unavailability_id=? and user=?;";
      connection.query(query, [id, user], function (error, rows, fields) {
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

module.exports = router;