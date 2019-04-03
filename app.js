const express = require('express')
const app = require('express')()
const http = require('http').createServer(app)

/**
 * @Express Server
 */
app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/index.html')
})
app.use(express.static('assets'))

/*
 * Porta do servidor
 */
http.listen(3000, function(){
	console.log('Listening on port 3000')
})