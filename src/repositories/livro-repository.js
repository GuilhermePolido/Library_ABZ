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
    const value = `%${id}%`;
    const fields = [
        'DS_TITULO',
        'NM_AUTOR',
        'NM_EDITOR',
        'NR_CLASSIFICACAO',
        'NR_PAGINA',
        'CD_LIVRO'
    ];

    let values = [];

    let select = 'SELECT * FROM livro WHERE';
    const like = ' LIKE ?';
    const or = ' OR';

    for (let i = 0; i < fields.length; i++) {
        select += ` ${fields[i]}${like}${i == fields.length -1 ? '' : or}`;
        values.push(value);
    }

    return new Promise((resolve, reject) => {
        db.query(select, values, function (err, results, fields) {
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