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

module.exports = router;