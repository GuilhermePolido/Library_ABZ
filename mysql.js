var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'library'
});

db.connect();

db.query('SELECT id from professor', function (error, results, fields) {
if (error) throw error;
    console.log('The solution is: ', results[0]);
});

db.end();