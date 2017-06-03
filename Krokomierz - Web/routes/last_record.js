/**
 * Created by Samsung on 2017-06-01.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(JSON.parse('[{"name": "Mikołaj", "username": "Mustafa", "id":1},{"name": "Adrian", "username": "Simba", "id":69}]'));
});

module.exports = router;
