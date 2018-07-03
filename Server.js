var express = require("express");
var app = express();
var router = express.Router();
var routerClass = require('./router');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var listEndpoints = require("express-list-endpoints");
var apiList = null;


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.use("/",router);
app.use("/", routerClass);

app.get("/", function (req, res) {
  console.info(apiList);
  res.send(apiList);
});

apiList = listEndpoints(app);

app.listen(3000,function(){
  console.log("Live at Port 3000");
});