var express = require('express');
var router = express.Router();

router.get('/getuserinfo', function(req, res, next){

    req.pool.getConnection(function(err, connection){

        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        let query = "SELECT user_name, first_name, last_name, email FROM users WHERE users.user_name = ?";
        connection.query(query, [req.session.user_name], function(error, rows, fields){
            connection.release();
            if(error){
                console.log(error);
                res.sendStatus(500);
                return;
            }

            console.log(rows);
            res.json(rows);
        })

    })

})

router.get('/getfieldlengths', function(req, res, next){

    //Checks if user has entered something in a field that is longer than we have allocated space for
    req.pool.getConnection(function(err, connection){

        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        //SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'production' AND TABLE_NAME = 'users' AND (COLUMN_NAME = 'first_name' OR COLUMN_NAME = 'last_name' OR COLUMN_NAME = 'email' OR COLUMN_NAME = 'user_name');
        //SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'production' AND TABLE_NAME = 'users';
        let query = "SELECT JSON_OBJECTAGG(COLUMN_NAME, CHARACTER_MAXIMUM_LENGTH) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'production' AND TABLE_NAME = 'users' AND (COLUMN_NAME = 'first_name' OR COLUMN_NAME = 'last_name' OR COLUMN_NAME = 'email' OR COLUMN_NAME = 'user_name')";
        connection.query(query, [req.body.field], function(error, rows, fields){
            connection.release();
            console.log(rows);
            console.log(fields);
            if(error){
                console.log(error);
                res.sendStatus(500);
                return;

            }

            res.json(rows);
        })
    })

})

router.post('/updateinfo', function(req, res, next){

    req.pool.getConnection(function(err, connection){

        console.log("trying to make query");

        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        let oldValue = req.session[req.body.field];
        let query = "UPDATE users SET ?? = ? WHERE ?? = ?";
        //query will look like: UPDATE users SET user_name = "Seamus" WHERE user_name = "name"
        connection.query(query, [req.body.field, req.body.newFieldValue, req.body.field, oldValue], function(error, rows, fields){
            connection.release();
            if(error){
                console.log(error);
                res.sendStatus(500);
                return;
            }
        })
    })

    res.send();
})

module.exports = router;