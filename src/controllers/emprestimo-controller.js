const repository = require('../repositories/emprestimo-repository');
const livro_repository = require('../repositories/livro-repository');
const date = require('date-and-time');

exports.post = async (req, res, next) => {
    try {
        let now = new Date();

        req.body.dt_emprestimo = date.format(now, 'YYYY/MM/DD');
        //req.body.dt_devolucao  = date.format(date.addDays(now, 7), 'DD/MM/YYYY');
        console.log(req.body.cd_livro);
        // Seta o st_livro como emprestado
        await livro_repository.emprestimo(req.body.cd_livro);

        await repository.create(req.body);
        res.status(200).send('Empréstimo criado com sucesso!');
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao criar empréstimo. ' + e
        });
    }
}