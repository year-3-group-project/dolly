var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('transactions', { title: 'Trips' });
});

module.exports = router;
