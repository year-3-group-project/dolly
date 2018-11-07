var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('vehicles', { title: 'Vehicles' });
});

module.exports = router;
