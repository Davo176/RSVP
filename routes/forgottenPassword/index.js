var express = require('express');
var router = express.Router();

//This function generates a 6 digit code and stores it in the database
router.post('/generateCode', function(req, res, next){

    req.pool.getConnection(function (error, connection) {
        if(error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        let query = "UPDATE users SET forgotten_password_code = (SELECT RAND()*(1000000-100000)+100000) WHERE user_name=?";
        connection.query(query, [req.body.user_name], function(error, rows, fields){
            connection.release();
            if(error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            //Rows.message looks like: (Rows matched: 0  Changed: 0  Warnings: 0 if no matches
            //search() function will return -1 if no matches
            if(rows.message.search("1") == -1){
                res.sendStatus(401);
            } else {
                next();
            }
        });
    })

});

//This function sends an email to the client
router.post('/sendEmail', function(req, res, next){

    let email = "";

    //Gets the user's email
    req.pool.getConnection(function (error, connection) {
        if(error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        let query = "SELECT email FROM users WHERE user_name = ?";
        connection.query(query, [req.body.user_name], function(error, rows, fields){
            connection.release();
            if(error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            console.log(rows);

        })
    })

});

module.exports = router;