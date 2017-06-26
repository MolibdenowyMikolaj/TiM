var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', { root : __dirname + '/..'});
});

router.get('/systemjs', function(req, res, next) {
    res.sendFile('systemjs.config.js', { root : __dirname + '/..'});
});

router.get('/style', function(req, res, next) {
    res.sendFile('app.css', { root : __dirname + '/..'});
});

router.get('/favicon.ico', function(req, res, next) {
    res.sendFile('favicon.ico', { root : __dirname + '/..'});
});

module.exports = router;
