const express = require('express')
const app = require('express')()
const bodyParser = require('body-parser');
const http = require('http').createServer(app)

require('./config/config');
require('./mysql');
require('./sequilize');

/**
 * @Express Server
 */
app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/public/index.html')
})
app.use(express.static('public'))

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Carrega as rotas
const livroRoute = require('./src/routes/livro-route');
const usuarioRoute = require('./src/routes/usuario-route');
const estanteRoute = require('./src/routes/estante-route');
const reservaRoute = require('./src/routes/reserva-route');
const emprestimoRoute = require('./src/routes/emprestimo-route');
const devolucaoRoute = require('./src/routes/devolucao-route');

app.use('/API/livros', livroRoute);
app.use('/API/usuarios', usuarioRoute);
app.use('/API/estante', estanteRoute);
app.use('/API/reserva', reservaRoute);
app.use('/API/emprestimo', emprestimoRoute);
app.use('/API/devolucao', devolucaoRoute);

/*
 * Porta do servidor
 */
http.listen(3000, function(){
	console.log('Listening on port 3000')
})