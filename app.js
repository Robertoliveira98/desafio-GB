const express = require('express');
const controllers = require('./controllers');
const destaquesController = require('./controllers/destaques.controller');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost/desafioGB');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('/', controllers.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
