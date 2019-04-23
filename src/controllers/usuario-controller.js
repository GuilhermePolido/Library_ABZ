const repository = require('../repositories/usuario-repository');
const repositoryEstante = require('../repositories/estante-repository');
const authService = require('../services/auth-service');
const md5 = require('md5');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição' + e
        });
    }
}

exports.post = async (req, res, next) => {
    try {
        // Criptografa a senha
        req.body.ds_senha = md5(req.body.ds_senha + global.SALT_KEY);

        // Cadastra o usuário
        await repository.create(req.body);
        await repositoryEstante.create({"CD_ADMINISTRADOR": req.body.CD_USUARIO});

        res.status(200).send('Usuário cadastrado com sucesso!');
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar usuário. ' + e
        });
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        // Criptografa a senha
        req.body.ds_senha = md5(req.body.ds_senha + global.SALT_KEY);

        // BUsca no banco um usuário com o login e senha passados
        var result = await repository.authenticate(req.body);

        // Caso não encontre
        if (!result) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        var usuario = result.dataValues;

        // Gera o token
        const token = await authService.generateToken({
            user: usuario.cd_usuario,
            email: usuario.ds_email,
            name: usuario.nm_usuario
        });

        res.status(201).send({
            token: token,
            data: {
                email: usuario.ds_email,
                name: usuario.nm_usuario
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao autenticar usuário. ' + e
        });
    }
}

exports.put = async (req, res, next) => {
    try {
        // Criptografa a senha
        req.body.ds_senha = md5(req.body.ds_senha + global.SALT_KEY);

        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Usuário atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao atualizar usuário. ' + e
        });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.cd_usuario)
        res.status(200).send({
            message: 'Usuário removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao remover usuário. ' + e
        });
    }
};