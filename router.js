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

router.get("/red",function(req,res){
    var obj = JSON.stringify(timer.getRedTeamTimer());
    res.send(obj);
});

router.get("/blue",function(req,res){
    var obj = JSON.stringify(timer.getBlueTeamTimer());
    res.send(obj);
});

router.get('/startTimer/:Team', function (req, res) {
    var teamVal = req.params.Team;
    var obj = timer.startTimer(teamVal);
    res.send(JSON.stringify(obj));
});

router.post('/startTimer', function (req, res) {
    var teamVal = req.body.Team;
    var obj = timer.startTimer(teamVal);
    res.send(JSON.stringify(obj));
});

module.exports = router;