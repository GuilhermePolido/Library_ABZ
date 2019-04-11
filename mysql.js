const mysql = require('mysql');
const Sequelize = require('sequelize');

global.db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mydb'
});

db.connect(function(err){
  if(err) {
    console.log(err)
  } else {
    console.log('Banco de Dados concectado com sucesso!')
  }
})

// Sequelize

const sequelize = new Sequelize('mydb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
  // To create a pool of connections
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});