require('rootpath')(); 

var express = require('express');
var app = express();
var api = express();
var cors = require('cors')
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var port = process.env.PORT || 8092;
var apiPort = 9050; 

app.use(express.static( __dirname + '/libs/'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
 
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

app.use(cors())
api.use(cors())

api.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/api/question', require('./controllers/api/question.controller'));

app.get('/', function (req, res) {
    return res.redirect('/app');
});
var server = app.listen(port, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});

var serverAPI = app.listen(apiPort, function () {
    console.log('Server API listening at http://' + serverAPI.address().address + ':' + serverAPI.address().port);
});