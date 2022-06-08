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
            //Change session to have updated value
            req.session[req.body.field] = req.body.newFieldValue;
        })
    })
    res.sendStatus(200);
})

router.post('/updateEmailSettings', function(req, res, next){

    req.pool.getConnection(function(err, connection){

        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        let setting = req.body.setting;
        let newState = req.body.newState;
        let user = req.session.user_name;


        let query = `insert into user_email_settings (user_name,setting_name,setting_state)
                    values (?,?,?)
                    ON DUPLICATE KEY UPDATE setting_state=?;
                    `;
        //query will look like: UPDATE users SET user_name = "Seamus" WHERE user_name = "name"
        connection.query(query, [user,setting,newState,newState], function(error, rows, fields){
            connection.release();
            if(error){
                console.log(error);
                res.sendStatus(500);
                return;
            }
        })
    })
    res.sendStatus(200);
})

router.get('/emailSettings', function(req, res, next){

    //Checks if user has entered something in a field that is longer than we have allocated space for
    req.pool.getConnection(function(err, connection){

        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        let query = "select setting_name,setting_state from user_email_settings where user_name=?";
        connection.query(query, [req.session.user_name], function(error, rows, fields){
            connection.release();

            if(error){
                console.log(error);
                res.sendStatus(500);
                return;

            }
            res.json(rows);
        })
    })

})

module.exports = router;