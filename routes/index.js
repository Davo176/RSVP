var express = require('express');
var router = express.Router();

router.get('/forgottenPassword', function(req, res, next){
  res.sendFile('/public/forgottenPassword.html', { root: __dirname+"/.." });
});

router.use(function(req,res,next){
  if (!("user_name" in req.session)){
    res.redirect('/login');
  }else{
    next();
  }
});

/* GET home page. */
router.get('/test', function(req, res, next) {
  if('session' in req)
  {
    res.json(req.session);
  }
  else
  {
    res.send('This is a test');
  }
});

router.get('/user', function(req, res, next) {
  res.send(req.session.first_name);
});

router.get('/', function(req, res, next) {
  res.redirect('/events');
});

router.get('/event', function(req, res, next) {
  //if request doesnt have an event id
  if ("id" in req.query)
  {
    //check if they are allowed to see the event
    req.pool.getConnection(function(error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
      let user = req.session.user_name;
      let id = req.query.id;
      let query = "select * from event_invitees where invitee_id=? and event_id=?";
      connection.query(query, [user, id], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        if (rows.length>=1){
          res.sendFile('/public/event.html', { root: __dirname+"/.." });
        }else{
          res.sendStatus(403);
        }
      });
    });
    }
  else
  {
    //cannot find
    res.sendStatus(404);
  }
});
//allow pages to be accessed without the .html
router.get('/calendar', function(req, res, next) {
  res.sendFile('/public/calendar.html', { root: __dirname+"/.." });
});

router.get('/events', function(req, res, next) {
  res.sendFile('/public/events.html', { root: __dirname+"/.." });
});

router.get('/friends', function(req, res, next) {
  res.sendFile('/public/friends.html', { root: __dirname+"/.." });
});

router.get('/newevent', function(req, res, next) {
  res.sendFile('/public/newevent.html', { root: __dirname+"/.." });
});

router.get('/account', function(req, res, next){
  res.sendFile('/public/account.html', { root: __dirname+"/.."});
});

router.get('/forgottenPassword', function(req, res, next){
  res.sendFile('/public/forgottenPassword.html');
});

router.get('/logout', function(req, res, next){
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});



module.exports = router;
