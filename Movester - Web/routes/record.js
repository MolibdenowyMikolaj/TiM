var app = require('../app.js');
var express = require('express');
var router = express.Router();

//todo
router.post('/create', function(req, res, next) {
    var token = app.decode(req.header('Authorization'));
    if(app.validate(token)) {
        var userId = token.context.user.id;
        app.connection.query('INSERT INTO RECORD (id_user, active, count_step, distance, time_start, time_end) VALUES (?, 1, 0, 0, NOW(), null)', userId, function (err, rows, fields) {
            if (!err) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(500);
                console.log(err);
            }
        });
    } else {
        res.send({status: '401'});
    }
});

router.get('/active', function(req, res, next) {
    var token = app.decode(req.header('Authorization'));
    if(app.validate(token)) {
        var userId = token.context.user.id;
        app.connection.query('SELECT id_record FROM RECORD WHERE id_user = ? AND active = 1', userId, function (err, rows, fields) {
            if (!err) {
                res.send(rows);
            }
            else {
                res.sendStatus(500);
                console.log(err);
            }
        });
    } else {
        res.send({status: '401'});
    }
});

router.post('/survey', function(req, res, next) {
    var token = app.decode(req.header('Authorization'));
    if(app.validate(token)){
        var userId = token.context.user.id;
        var recordId = req.body.id_record;
        var countStep = req.body.count_step;
        var timeStart = req.body.time_start;
        var latitudeStart = req.body.latitude_start;
        var longitudeStart = req.body.longitude_start;
        var timeEnd = req.body.time_end;
        var latitudeEnd = req.body.latitude_end;
        var longitudeEnd = req.body.longitude_end;
        if(recordId && countStep && timeStart && latitudeStart && longitudeStart && timeEnd && latitudeEnd && longitudeEnd) {
            app.connection.query('SELECT id_user FROM RECORD WHERE id_record = ?', recordId, function (err, rows, fields) {
                if (!err) {
                    var response = rows[0];
                    if(response.id_user == userId) {
                        app.connection.query('INSERT INTO SURVEY (id_record, count_step, time_start, latitude_start, longitude_start, time_end, latitude_end, longitude_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [recordId, countStep, timeStart, latitudeStart, longitudeStart, timeEnd, latitudeEnd, longitudeEnd], function (err, rows, fields) {
                            if (!err) {
                                res.sendStatus(200);
                            }
                            else {
                                res.sendStatus(500);
                                console.log(err);
                            }
                        });
                    } else {
                        res.sendStatus(401);
                    }
                }
                else {
                    res.sendStatus(500);
                    console.log(err);
                }
            });
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(401);
    }
});


router.post('/close', function(req, res, next) {
    var token = app.decode(req.header('Authorization'));
    if(app.validate(token)) {
        var userId = token.context.user.id;
        var recordId = req.body.id_record;
        var countStep = req.body.count_step;
        var distance = req.body.distance;
        var timeStart = req.body.time_start;
        var timeEnd = req.body.time_end;
        if(recordId && countStep && distance) {
            app.connection.query('SELECT id_user FROM RECORD WHERE id_record = ?', recordId, function (err, rows, fields) {
                if (!err) {
                    var response = rows[0];
                    if(response.id_user == userId) {
                        if(timeStart && timeEnd) {
                            app.connection.query('UPDATE RECORD SET active = 0, count_step = ?, distance = ?, time_start = ?, time_end = ? WHERE id_record = ?', [countStep, distance, timeStart, timeEnd, recordId], function (err, rows, fields) {
                                if (!err) {
                                    res.sendStatus(200);
                                }
                                else {
                                    res.sendStatus(500);
                                    console.log(err);
                                }
                            });
                        } else {
                            app.connection.query('UPDATE RECORD SET active = 0, count_step = ?, distance = ?, time_end = NOW() WHERE id_record = ?', [countStep, distance, recordId], function (err, rows, fields) {
                                if (!err) {
                                    res.sendStatus(200);
                                }
                                else {
                                    res.sendStatus(500);
                                    console.log(err);
                                }
                            });
                        }
                    } else {
                        res.sendStatus(401);
                    }
                }
                else {
                    res.error(500);
                    console.sendStatus(err);
                }
            });
        } else {
            res.sendStatus(400);
        }
    } else {
        res.send({status: '401'});
    }
});

module.exports = router;
