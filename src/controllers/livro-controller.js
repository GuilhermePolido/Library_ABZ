const repository = require('../repositories/livro-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(200).send('Livro cadastrado com sucesso!');
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao cadastrar livro'
        });
    }
}