exports.create = async(usuario) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuario SET ?', usuario, (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })
    })
}

exports.get = async() => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario', function (err, results, fields) {
            if(err) reject();
            resolve(results);
        })
    })
}

exports.update = async(id, data) => {    
    return new Promise((resolve, reject) => {
        db.query('UPDATE usuario SET ? WHERE cd_usuario = ?', [data, id], (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })        
    })
}

exports.delete = async(id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM usuario WHERE cd_usuario = ?', id, (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })       
    })
}

// Sequelize metods
const { Usuario } = require('../../app/models');

exports.authenticate = async(data) => {
    return Usuario.findOne({
        attributes: ['cd_usuario', 'ds_email', 'nm_usuario'],
        where: {
            cd_usuario: data.cd_usuario,
            ds_senha: data.ds_senha
        }
    });
}