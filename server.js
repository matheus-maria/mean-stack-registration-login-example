// biblioteca js que faz o mapeamento das pastas em função do server.js
require('rootpath')(); 
// Inicialização do express. Notem que fiz aqui uma modificação do projeto original. criei duas variáveis de express
// separando de vez api e app. Em um desenvolvimento mais sofisticado, onde você deseje fazer balanceamento de carga
// separadamente para cada ponto da solução, você teria que criar dois server.js e quebrar de vez a aplicação
var express = require('express');
var app = express();
var api = express();
// Inicializando o gerenciamento de sessão. Iremos usar esse gerenciamento para armazenar o token da API e o userID logado.
var session = require('express-session');
// bibloteca que ajuda no parse de mensagens requisitadas que contém JSON
var bodyParser = require('body-parser');
// essa biblioteca será utilizada na API para fazer autenticaçao seguindo o método JWT. 
// Se quiser estudar um pouco mais sobre JWT, pesquise aqui
// https://jwt.io/introduction/
var expressJwt = require('express-jwt');
// carrega as configurações mapeadas no json
var config = require('config.json');
// faz a leitura da porta que será utilizada para o app
var port = process.env.PORT || 8092;
// agora escutando em uma porta diferente a api.
var apiPort = 9050; 

app.use(express.static( __dirname + '/libs/'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
 
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

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