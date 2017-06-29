/**
 * Created by Samsung on 2017-06-01.
 */

var app = require('../app.js');
var express = require('express');
var router = express.Router();

router.get('/all', function(req, res, next) {
    var token = app.decode(req.header('Authorization'));
    if(app.validate(token)) {
        var userId = token.context.user.id;
        app.connection.query('SELECT * FROM RECORD R INNER JOIN USER U WHERE R.id_user = ? AND U.id_user = ?', [userId, userId], function (err, rows, fields) {
            if (!err) {
                res.send(rows);
            }
            else {
                res.send({status: "ERROR", message: "Nieoczekiwany błąd"});
                console.log(err);
            }
        });
    } else {
        res.send({status: '401'});
    }
});

router.get('/last', function(req, res, next) {
    var token = app.decode(req.header('Authorization'));

    if(app.validate(token)) {
        var userId = token.context.user.id;
        app.connection.query('SELECT R.id_record FROM RECORD R INNER JOIN USER U WHERE R.id_user = ? AND U.id_user = ? AND R.active = 0 ORDER BY R.time_end DESC LIMIT 1', [userId, userId], function (err, rows, fields) {
            if (!err) {
                res.send(rows[0]);
            }
            else {
                res.send({status: "ERROR", message: "Nieoczekiwany błąd"});
                console.log(err);
            }
        });
    }
});

router.get('/details', function(req, res, next) {
    var token = app.decode(req.header('Authorization'));

    if(app.validate(token)) {
        var userId = token.context.user.id;
        var recordId = req.query.id_record;
        if(recordId) {
            app.connection.query('SELECT id_user FROM RECORD WHERE id_record = ?', recordId, function (err, rows, fields) {
                if (!err) {
                    var response = rows[0];
                    if(response.id_user == userId) {
                            app.connection.query('SELECT * FROM SURVEY S JOIN RECORD R ON S.id_record = R.id_record WHERE R.id_record = ? AND R.active = 0', [recordId], function (err, rows, fields) {
                                if (!err) {
                                    res.send(rows);
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
                    res.error(500);
                    console.sendStatus(err);
                }
            });
        } else {
            res.sendStatus(400)
        }
    } else {
        res.send({status: '401'});
    }

});

module.exports = router;
