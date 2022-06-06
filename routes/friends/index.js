var express = require('express');
var router = express.Router();
const moment = require('moment');
const Uuid = require('uuid');


//get friends
router.get('/', function(req,res,next){
  if (req.query.month == undefined || req.query.year==undefined){
    res.sendStatus(400);
  }else{
    let user = req.session.user_name;
    let month = req.query.month;
    req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let query = "";
      connection.query(query, [], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }

      });
    });
  }
});
//get requests
router.get('/requests', function(req,res,next){
    if (req.query.month == undefined || req.query.year==undefined){
      res.sendStatus(400);
    }else{
      let user = req.session.user_name;

      req.pool.getConnection(function(error, connection){
        if(error){
          console.log(error);
          res.sendStatus(500);
          return;
        }

        let query = "";
        connection.query(query, [], function(error, rows, fields) {
          connection.release();
          if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
          }

        });
      });
    }
  });

router.post('/acceptRequest', function(req,res,next){
  if (!('reason' in req.body)){
    res.sendStatus(400);
    return;
  }else{
    let user = req.session.user_name;

    const ID = Uuid.v4();
    req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let query = "";
      connection.query(query, [], function(error, rows, fields) {
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

router.post('/declineRequest', function(req,res,next){
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
      let query = "";
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

router.post('/sendRequest', function(req,res,next){
    if (!('date' in req.body) || !('unavailable_from' in req.body) || !('unavailable_to' in req.body) || !('reason' in req.body)){
      res.sendStatus(400);
      return;
    }else{
      let user = req.session.user_name;

      const unavailabilityID = Uuid.v4();
      req.pool.getConnection(function(error, connection){
        if(error){
          console.log(error);
          res.sendStatus(500);
          return;
        }

        let query = "";
        connection.query(query, [], function(error, rows, fields) {
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

  router.post('/removeFriend', function(req,res,next){
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
        let query = "";
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

  router.get('/search', function(req,res,next){
    if (req.query.searchTerm == undefined){
      res.sendStatus(400);
    }else{
      let searchTerm = '%' + req.query.searchTerm + '%';
      let user = req.session.user_name
      req.pool.getConnection(function(error, connection){
        if(error){
          console.log(error);
          res.sendStatus(500);
          return;
        }

        let query = `SELECT user_name, first_name, last_name FROM users
                     where
                     (user_name LIKE ?
                     OR first_name like ?
                     OR last_name like ?
                     OR concat(first_name, ' ', last_name) like ?)
                     AND
                     user_name NOT IN (select requester from friends where requestee = ? UNION select requestee from friends where requester=?)
                     order by first_name, last_name, user_name;
                    `;
        connection.query(query, [searchTerm,searchTerm,searchTerm,searchTerm,user,user], function(error, rows, fields) {
          connection.release();
          if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
          }
          res.json(rows)
        });
      });
    }
  });

module.exports = router;