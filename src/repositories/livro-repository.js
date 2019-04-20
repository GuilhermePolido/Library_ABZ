const { Livro } = require('../../app/models');

exports.create = async(livro) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO livro SET ?', livro, (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })
    })
}

/*
exports.create = async(livro) => {
    return Livro.query('INSERT INTO LIVRO SET ?', {
        raw: true, 
        replacements: [livro]
    });
}
*/

exports.get = async() => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM livro', function (err, results, fields) {
            if(err) reject();
            resolve(results);
        })
    })
}

exports.getById = async(id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM livro WHERE cd_livro = ?', id, function (err, results, fields) {
            if(err) reject();
            resolve(results);
        })
    })
}

exports.update = async(id, data) => {    
    return new Promise((resolve, reject) => {
        db.query('UPDATE livro SET ? WHERE cd_livro = ?', [data, id], (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })        
    })
}

exports.delete = async(id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM livro WHERE cd_livro = ?', id, (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })       
    })
}