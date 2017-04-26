var express = require('express');
var app = express();
var mongoose = require('mongoose');

var db 

if(process.env.ENV == 'Test') {
    console.log('Connectinng to test env');
   db = mongoose.connect('mongodb://localhost/bookApi_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookApi');
}


var port = process.env.port || 3000;
var bodyParser = require('body-parser');
var bookRouter = require('./Routes/bookRoutes')();

//Config Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Routes
app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('welcome to the page');
});

app.listen(port, function() {
    console.log('Started listening on port - ' + port)
})


module.exports = app;