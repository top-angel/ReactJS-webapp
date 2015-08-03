var express = require('express');
var router = express.Router();
var setmine = require('../api-handlers/setmine')
var winston = require('winston');

// setmine.init(function() {
//     winston.info("setmine models stored.")
// })

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('/src/index.html');
});

module.exports = router