var express = require('express');
var router = express.Router();

// /* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
    //var Keywords = req.body.Keywords;
    console.log("Yoooooo");
    console.log(req.headers);
    console.log(req.body);
    res.status(200).send("yay");
});

module.exports = router;
