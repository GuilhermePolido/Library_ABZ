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

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.find = async(req, res, next) => {
    try {
        var data = await repository.find(req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'+e
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

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Livro atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao atualizar livro'
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Livro removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao remover livro'
        });
    }
};