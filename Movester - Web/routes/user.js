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

router.post('/register', function (req, res, next) {
    var login = req.body.login;
    var password = req.body.password;
    var email = req.body.e_mail;
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    app.connection.query('SELECT login FROM USER WHERE login = ?',[login],function(err, rows, fields) {
        if(rows && rows.length == 0) {
            app.connection.query('INSERT INTO USER (login, password, first_name, last_name, e_mail) VALUES (?,?,?,?,?)', [login, password, firstName, lastName, email], function (err, rows, fields) {
                if (!err) {
                    res.send({status: "OK"});
                }
                else {
                    res.send({status: "ERROR"});
                    console.log(err);
                }
            });
        } else {
            res.send({status: "ERROR", message: "Użytkownik istnieje"});
        }
    });

});

router.get('/data', function (req, res, next) {

    var id = req.query.id;
    var token = app.decode(req.header('Authorization'));

    if(token && token.context.user.id == id) {
        app.connection.query('SELECT id_user, login, first_name, last_name, e_mail FROM USER WHERE id_user = ?', id, function (err, rows, fields) {
            if (!err) {
                res.send(rows);
            }
            else {
                res.send({status: 'ERROR', message: 'Nieoczekiwany błąd'});
                console.log(err);
            }
        });
    } else {
        //TODO global info
        res.send({status: '401'});
    }
});

router.get('/friends', function (req, res, next) {
    var id = req.query.id;
    var token = app.decode(req.header('Authorization'));

    if(token && token.context.user.id == id) {
        app.connection.query('SELECT U.id_user, U.login, U.first_name, U.last_name, U.e_mail FROM USER U INNER JOIN FRIEND F ON U.id_user = F.id_friend WHERE F.id_user = ?', id, function (err, rows, fields) {
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

// Maybe it will be handy in future
// router.get('/stats', function (req, res, next) {
//     var id = req.query.id;
//     app.connection.query('SELECT id_user, login, first_name, last_name FROM USER WHERE id_user = ?', id, function (err, rows, fields) {
//         if (!err) {
//             res.send(rows);
//         }
//         else {
//             res.send({status: 'ERROR', message: 'Nieoczekiwany błąd'});
//             console.log(err);
//         }
//     });
// });

module.exports = router;
