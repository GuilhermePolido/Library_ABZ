var mysql      = require('mysql');
global.db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mydb'
});

db.connect();

db.query('SELECT * from teste', function (error, results, fields) {
if (error) throw error;
    console.log('The solution is: ', results[0]);
});

db.end();