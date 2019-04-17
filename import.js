
var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('mydb', 'root', '',{
  host: 'localhost',
  port:'3306',
  dialect: 'mysql'
});

auto.run(function (err) {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
