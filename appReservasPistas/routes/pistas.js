var express = require('express');
var router = express.Router();
/* var mongoose = require('mongoose');
var db = mongoose.connection; */

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;