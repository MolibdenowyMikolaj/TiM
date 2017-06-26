/**
 * Created by Samsung on 2017-06-01.
 */

var app = require('../app.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var id = req.query.id;
    var token = app.decode(req.header('Authorization'));

    if(token && token.context.user.id == id) {
        app.connection.query('SELECT * FROM RECORD R INNER JOIN USER U WHERE R.id_user = ? AND U.id_user = ?', [id, id], function (err, rows, fields) {
            if (!err) {
                res.send(rows);
            }
            else {
                res.send({status: "ERROR", message: "Nieoczekiwany błąd"});
                console.log(err);
            }
        });
    }
});

router.get('/last', function(req, res, next) {
    var id = req.query.id;
    var token = app.decode(req.header('Authorization'));

    if(token && token.context.user.id == id) {
        app.connection.query('SELECT * FROM RECORD R INNER JOIN USER U WHERE R.id_user = ? AND U.id_user = ? LIMIT 1', [id, id], function (err, rows, fields) {
            if (!err) {
                res.send(rows);
            }
            else {
                res.send({status: "ERROR", message: "Nieoczekiwany błąd"});
                console.log(err);
            }
        });
    }
});

module.exports = router;
