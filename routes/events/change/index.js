var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if (!("event_id" in req.body)) {
        res.sendStatus(400);
        return;
    } else {
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let user = req.session.user_name;
            let event = req.body.event_id
            let query = "select * from event_admins where admin_id = ? and event_id = ?";
            connection.query(query, [user, event], function (error, rows, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                if (rows.length >= 1) {
                    next();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }
});

router.post('/title', function (req, res, next) {
    if (!('title' in req.body)) {
        res.sendStatus(400);
    } else {
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let event_id = req.body.event_id;
            let title = req.body.title
            let query = "update events set event_title = ? where event_id = ?";
            connection.query(query, [title, event_id], function (error, rows, fields) {
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

router.post('/date', function (req, res, next) {
    if (!('date' in req.body)) {
        res.sendStatus(400);
    } else {
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let event_id = req.body.event_id;
            let date = req.body.date
            let query = "update events set event_date = ? where event_id = ?";
            connection.query(query, [date, event_id], function (error, rows, fields) {
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

router.post('/time', function (req, res, next) {
    if (!('time' in req.body)) {
        res.sendStatus(400);
    } else {
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let event_id = req.body.event_id;
            let time = req.body.time
            let query = "update events set event_time = ? where event_id = ?";
            connection.query(query, [time, event_id], function (error, rows, fields) {
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

router.post('/address', function (req, res, next) {
    if (!('address' in req.body)) {
        res.sendStatus(400);
    } else {
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let event_id = req.body.event_id;
            let address = req.body.address
            let query = "update events set event_address = ? where event_id = ?";
            connection.query(query, [address, event_id], function (error, rows, fields) {
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

router.post('/description', function (req, res, next) {
    if (!('description' in req.body)) {
        res.sendStatus(400);
    } else {
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let event_id = req.body.event_id;
            let description = req.body.description
            let query = "update events set event_description = ? where event_id = ?";
            connection.query(query, [description, event_id], function (error, rows, fields) {
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
