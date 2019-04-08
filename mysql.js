const mysql = require('mysql');

global.db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mydb'
});

db.connect(function(err){
  if(err) {
    console.log()
  }
})

/** Testa a conexão fazendo esse SELECT */
