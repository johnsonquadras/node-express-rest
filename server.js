var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;   

var router = express.Router();


router.get('/', function(req, res) {
    console.log("test")
    res.send({message: "Hello World"});
});

app.use('api', router);
app.listen(port, process.env.IP || "127.0.0.1", function() {
     var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port) 
});





