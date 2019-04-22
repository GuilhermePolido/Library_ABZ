const repository = require('../repositories/reserva-repository');

exports.get = async(req, res, next) => {
    try {        
        var data = await repository.get(req.params.livro);
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
        res.status(200).send('Reserva cadastrada com sucesso!');
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao cadastrar reserva. '+e
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.cd_reserva);
        res.status(200).send({
            message: 'Reserva removida com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao remover reserva'
        });
    }
}