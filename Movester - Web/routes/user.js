var app = require('../app.js');
var express = require('express');
var router = express.Router();

router.get('/login', function (req, res, next) {
    var login = req.query.id;
    app.connection.query('SELECT * FROM USER WHERE id_user = ?', id, function (err, rows, fields) {
        if (!err) {
            res.send(rows);
        }
        else {
            res.send({status: "ERROR", message: "Nieoczekiwany błąd"});
            console.log(err);
        }
    });
});

router.get('/data', function (req, res, next) {
    var id = req.query.id;
    app.connection.query('SELECT * FROM USER WHERE id_user = ?', id, function (err, rows, fields) {
        if (!err) {
            res.send(rows);
        }
        else {
            res.send({status: "ERROR", message: "Nieoczekiwany błąd"});
            console.log(err);
        }
    });
});

router.get('/stats', function (req, res, next) {
    var id = req.query.id;
    app.connection.query('SELECT * FROM USER WHERE id_user = ?', id, function (err, rows, fields) {
        if (!err) {
            res.send(rows);
        }
        else {
            res.send({status: "ERROR", message: "Nieoczekiwany błąd"});
            console.log(err);
        }
    });
});

module.exports = router;
