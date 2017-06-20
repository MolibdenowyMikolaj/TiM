var app = require('../app.js');
var express = require('express');

var router = express.Router();

router.post('/login', function (req, res, next) {
    var login = req.body.login;
    var password = req.body.password;
    app.connection.query('SELECT id_user FROM USER WHERE login = ? AND password = ?', [login, password], function (err, rows, fields) {
        if (!err) {
            if(rows.length == 1) {
                //create token
                var token = app.encode(req, rows[0].id_user, login);
                console.log(token);
                // send token
                res.send({status:200, body: { id: rows[0].id_user, token: token } });
            }
            else
                res.send({status: 200, message: "Niepoprawne dane logowania"});
        }
        else {
            res.send({status: "ERROR", message: "Nieoczekiwany błąd"});
            console.log(err);
        }
    });
});

router.get('/data', function (req, res, next) {

    var id = req.query.id;
    var token = app.decode(req.header('Authorization'));

    if(token && token.context.user.id == id) {
        app.connection.query('SELECT * FROM USER WHERE id_user = ?', id, function (err, rows, fields) {
            if (!err) {
                res.send(rows);
            }
            else {
                res.send({status: 'ERROR', message: 'Nieoczekiwany błąd'});
                console.log(err);
            }
        });
    } else {
        res.send({status: '401'});
    }
});

router.get('/stats', function (req, res, next) {
    var id = req.query.id;
    app.connection.query('SELECT * FROM USER WHERE id_user = ?', id, function (err, rows, fields) {
        if (!err) {
            res.send(rows);
        }
        else {
            res.send({status: 'ERROR', message: 'Nieoczekiwany błąd'});
            console.log(err);
        }
    });
});

module.exports = router;
