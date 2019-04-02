const express = require('express')
const app = require('express')()
global.http = require('http').createServer(app)

/**
 * @Express Server
 */
app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/index.html')
})
app.use(express.static('assets'))
app.use(express.static('client_source'))

/*
 * Porta do servidor
 */
http.listen(3000, function(){
	console.log('Listening on port 3000')
})