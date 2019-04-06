var mysql      = require('mysql');
/*
global.db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mydb'
});
*/

global.db = mysql.createConnection({
  host     : 'libabzdb.cxl5x6lbx3ur.us-east-2.rds.amazonaws.com',
  user     : 'admin',
  password : '',
  database : 'alunosutfpr2019'
});


/** Testa a conexão fazendo esse SELECT */
db.query('SELECT * from teste', function (error, results, fields) {
  if (error) throw error;
  console.log('------------------------');    
  console.log('The solution is: ', results[0]);
  console.log('------------------------');
  console.log('Conectado com o banco de dados.');
  console.log('------------------------');    
});