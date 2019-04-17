const { Livro } = require('./app/models');


/*
Livro.findAll({
  attributes: ['CD_LIVRO', 'DS_TITULO']
}).then(result => {
  result.map((livro) => {
    console.log(livro.dataValues)
  })  
})
*/

const Sequelize = require('sequelize');
const Op = Sequelize.Op

var qry = {
  cd_livro: {
    [Op.or]: [2, 3]
  }
}

Livro.findAll({
  attributes: ['cd_livro', 'ds_titulo'],
  where: qry
}).then(r => {
  console.log(r.map(e => e.dataValues))
})