var express = require('express');
var router = express.Router();

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

/*
EXAMPLE FROM PRAC 8
router.get('/actor', function(req,res,next){
  req.pool.getConnection(function(error, connection){
    if(error){
      console.log(error);
      res.sendStatus(500);
      return;
    }

    let query = "";
    connection.query(query, function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});
*/

module.exports = router;
