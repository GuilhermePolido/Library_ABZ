const repository = require('../repositories/devolucao-repository');
const emprestimo_repository = require('../repositories/emprestimo-repository');
const livro_repository = require('../repositories/livro-repository');
const date = require('date-and-time');

exports.post = async (req, res, next) => {
    try {
        var livro = req.body.cd_livro;
        
        let now = new Date(); 
        req.body.dt_devolucao = date.format(now, 'YYYY/MM/DD');        
        
        var emprestimo = await emprestimo_repository.find(req.body.cd_livro, req.body.cd_usuario);
        
        if(emprestimo) {
            emprestimo = emprestimo.cd_emprestimo;
        } else {
            res.status(500).send({
                message: 'Falha ao efetuar devolução. Livro não está emprestado pelo usuário.'
            });
        }

        req.body.cd_emprestimo = emprestimo;

        await repository.create(req.body);

        // Se fez a devolução com sucesso setar o livro como disponível e setar a data de devolução pra o empréstimo
        await livro_repository.devolucao(livro);

        await emprestimo_repository.devolucao(emprestimo, date.format(now, 'YYYY/MM/DD'));

        res.status(200).send('Devolução efetuada com sucesso!');
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao efetuar devolução. ' + e
        });
    }
}