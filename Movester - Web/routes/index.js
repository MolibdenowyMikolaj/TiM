var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('/views/view1/view1.html', { root : __dirname + '/..'});
});

module.exports = router;
