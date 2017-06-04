/**
 * Created by Samsung on 2017-06-01.
 */

var app = require('../app.js');
var express = require('express');
var router = express.Router();

router.get('/last', function(req, res, next) {
    res.send(JSON.parse('[{"name": "Mikołaj", "username": "Mustafa", "id":1},{"name": "Adrian", "username": "Simba", "id":69}]'));
});

module.exports = router;
