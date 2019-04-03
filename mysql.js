var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'library'
});

connection.connect();

connection.query('SELECT id from professor', function (error, results, fields) {
if (error) throw error;
    console.log('The solution is: ', results[0]);
});

connection.end();