var express = require('express');
var router = express.Router();

var sendMail = require('../../../email')

router.use(function (req, res, next) {
    if (!("event_id" in req.body) && !((req.path == "/uninvitedFriends" || req.path == "/unavailable") && ("event_id" in req.query))) {
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
            let event = req.body.event_id || req.query.event_id;
            let query = "select * from event_admins where admin_id = ? and event_id = ?";
            connection.query(query, [user, event], function (error, rows, fields) {
                connection.release();
                if (error) {
                    console.log(error);se
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
            let date = req.body.date;
            //no way of changing finalised event date
            let query = "update events set event_date = ? where event_id = ? and finalised=0";
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
            let time = req.body.time;
            //no way of changing finalised event time
            let query = "update events set event_time = ? where event_id = ? and finalised=0";
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

router.post('/finalise', function (req, res, next) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        let event_id = req.body.event_id;
        let query = "update events set finalised = 1 where event_id = ?";
        let query2 = "select event_title,event_date,event_time from events where event_id=?;"
        let query3 = `select * from events
                    left join event_invitees on events.event_id = event_invitees.event_id
                    left join users on event_invitees.invitee_id = users.user_name
                    left join user_email_settings on users.user_name = user_email_settings.user_name
                    where
                    events.event_id=?
                    and
                    user_email_settings.setting_name='finalise'
                    and
                    user_email_settings.setting_state=1;`


        connection.query(query, [event_id], function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
            connection.query(query2, [event_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    return;
                }
                let dateTime=rows[0].event_date + " " + rows[0].event_time;
                let eventTitle = rows[0].event_title
                connection.query(query3, [event_id], function (error, rows, fields) {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return;
                    }
                    let emailReceivers=rows;
                    emailReceivers=emailReceivers.map(e => e.email);
                    sendMail('Finalise',{dateTime:dateTime,eventTitle:eventTitle},emailReceivers);
                });
            });
        });
    });
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

router.post('/invite', function (req, res, next) {
    if (!('user_id' in req.body)) {
        res.sendStatus(400);
    } else {
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let event_id = req.body.event_id;
            let user_id = req.body.user_id
            let query = "insert into event_invitees (event_id,invitee_id,attending_status) values (?,?,?)";
            connection.query(query, [event_id, user_id, "Unsure"], function (error, rows, fields) {
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

router.post('/uninvite', function (req, res, next) {
    if (!('user_id' in req.body)) {
        res.sendStatus(400);
    } else {
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let event_id = req.body.event_id;
            let user_id = req.body.user_id
            let query = "delete from event_invitees where event_id = ? and invitee_id = ?";

            connection.query(query, [event_id, user_id], function (error, rows, fields) {
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

router.post('/makeAdmin', function (req, res, next) {
    if (!('user_id' in req.body)) {
        res.sendStatus(400);
    } else {
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let event_id = req.body.event_id;
            let user_id = req.body.user_id
            //theoretically need to check that they are invited first.
            let query = "insert into event_admins (event_id,admin_id) values (?,?)";
            connection.query(query, [event_id, user_id], function (error, rows, fields) {
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

router.post('/delete', function (req, res, next) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        let event_id = req.body.event_id;
        //theoretically need to check that they are invited first.
        let query  = "select event_title from events where event_id=?;"
        let query2 = `select users.email from events
                left join event_invitees on events.event_id = event_invitees.event_id
                left join users on event_invitees.invitee_id = users.user_name
                left join user_email_settings on users.user_name = user_email_settings.user_name
                where
                events.event_id=?
                and
                user_email_settings.setting_name='cancel'
                and
                user_email_settings.setting_state=1;`
        let query3 = "delete from events where event_id=?";
        connection.query(query, [event_id], function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            let eventTitle = rows[0].event_title
            connection.query(query2, [event_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                let emailReceivers=rows;
                emailReceivers=emailReceivers.map(e => e.email);
                connection.query(query3, [event_id], function (error, rows, fields) {
                    connection.release();
                    if (error) {
                        console.log(error);
                        return;
                    }
                    res.sendStatus(200);
                    sendMail('Cancel',{eventTitle:eventTitle},emailReceivers);
                });
            });
        });
    });
})

//NOTE this endpoint doesnt change anything, but need event admin privledges to see
router.get('/uninvitedFriends', function (req, res, next) {
    if (!('event_id' in req.query)) {
        res.sendStatus(400);
        return;
    } else {
        let user = req.session.user_name;
        let event_id = req.query.event_id;
        let query = `select
                    f.requester as user_name,
                    u.first_name,
                    u.last_name
                   from
                    friends as f
                   left join users as u on u.user_name=f.requester
                   where requestee=?
                   and
                   requester NOT IN (select event_invitees.invitee_id from event_invitees where event_invitees.event_id=?)
                   and
                   f.friendship_start_date is not null
                   union
                   select
                    f.requestee as user_name,
                    u.first_name,
                    u.last_name
                   from
                    friends as f
                   left join users as u on u.user_name=f.requestee
                   where requester=?
                   and
                   requester NOT IN (select event_invitees.invitee_id from event_invitees where event_invitees.event_id=?)
                   and
                   f.friendship_start_date is not null;`
        req.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            connection.query(query, [user, event_id, user, event_id], function (error, rows, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }

                res.send(rows);
            });
        });
    }
})

router.get('/unavailable', function (req, res, next) {
    if (!('event_id' in req.query) && !('date' in req.query) && !('time' in req.query)) {
        res.sendStatus(400);
        return;
    } else {
        let user = req.session.user_name;
        let event_id = req.query.event_id;
        let time=req.query.time;
        let date = req.query.date;
        let datetime = date+' '+time;
        let query = `   select distinct
                            us.first_name,
                            us.last_name,
                            us.user_name
                        from
                            unavailabilities as un
                        left join users as us on un.user=us.user_name
                        where
                            un.unavailable_from <= ?
                        and
                            un.unavailable_to >= ?
                        and
                            us.user_name in (select invitee_id from event_invitees where event_id=? and attending_status<>'Not Going')
                        and
                            (un.event_id <> ? or un.event_id is null);
                            `
        req.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            connection.query(query, [datetime,datetime,event_id,event_id], function (error, rows, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                res.send(rows);
            });
        });
    }
})

module.exports = router;