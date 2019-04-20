const repository = require('../repositories/estante-repository');
const authService = require('../services/auth-service');

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

exports.getEstanteAtual = async (req, res, next) => {
    try {
        // Recupera o token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // Decodifica o token
        var data = await authService.decodeToken(token);

        // Consulta as estantes desse usuário
        var result = await repository.getEstanteAtual(data.user);
        res.status(200).send(result);
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
        // Recupera o token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // Decodifica o token
        var data = await authService.decodeToken(token);
        
        await repository.delete(data.user);
        res.status(200).send({
            message: 'Estante removida com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao remover estante. ' + e
        });
    }
}