var mysql = require('mysql');
global.db = mysql.createConnection({
  host     : '',
  user     : 'id9180078_geison',
  password : 'bibliotecaabz',
  database : 'id9180078_biblioteca'
});

db.connect();

db.query('SELECT * from teste', function (error, results, fields) {
  if (error) throw error;
 console.log(results[0])
})

db.end();