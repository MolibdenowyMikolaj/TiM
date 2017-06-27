var express = require('express');
var router = express.Router();

//todo
router.post('/create', function(req, res, next) {
    var token = app.decode(req.header('Authorization'));
    if(app.validate(token)) {
        var userId = token.context.user.id;
        app.connection.query('INSERT INTO RECORD (id_user, active, count_step, length, time_start) VALUES (?, TRUE, 0, 0, "NOW()")', id, function (err, rows, fields) {
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

module.exports = router;
