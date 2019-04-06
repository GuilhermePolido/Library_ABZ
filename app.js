const express = require('express')
const app = require('express')()
const bodyParser = require('body-parser');
const http = require('http').createServer(app)

/**
 * @Express Server
 */
app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/public/index.html')
})
app.use(express.static('public'))

require('./mysql');

// Carrega as rotas
const livroRoute = require('./src/routes/livro-route');

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

app.use('/livros', livroRoute);

/*
 * Porta do servidor
 */
http.listen(3000, function(){
	console.log('Listening on port 3000')
})