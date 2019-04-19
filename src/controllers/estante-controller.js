const repository = require('../repositories/estante-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição. ' + e
        });
    }
}

exports.post = async (req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(200).send('Estante criada com sucesso!');
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao criar estante. ' + e
        });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.cd_estante)
        res.status(200).send({
            message: 'Estante removida com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao remover estante. ' + e
        });
    }
}