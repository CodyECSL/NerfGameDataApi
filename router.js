var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var path = __dirname + '/views/';
var timer = require('./timer');

// router.get("/",function(req,res){
//     res.sendFile(path + "index.html");
// });

// router.get("/about",function(req,res){
//     res.sendFile(path + "about.html");
// });

// router.get("/contact",function(req,res){
//     res.sendFile(path + "contact.html");
// });

// define the about route
router.post('/startTimer', function (req, res) {
    var teamVal = req.body.Team;
    var obj = timer.startTimer(teamVal);
    res.send(JSON.stringify(obj));
});

module.exports = router;