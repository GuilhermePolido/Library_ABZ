exports.create = async(livro) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO livro SET ?', livro, (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })
    })
}

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

exports.find = async(filtros) => {
    filtros = JSON.stringify(filtros);
    filtros = filtros.toLowerCase();
    filtros = JSON.parse(filtros);

    var qry = 'SELECT * FROM livro WHERE 1 = 1 ';

    if(filtros.ds_titulo && typeof filtros.ds_titulo !== "undefined") {
        qry += 'AND DS_TITULO LIKE "%' + filtros.ds_titulo + '%"';
    }

    if(filtros.nm_autor && typeof filtros.nm_autor !== "undefined") {
        qry += 'AND NM_AUTOR LIKE "%' + filtros.nm_autor + '%"';
    }

    if(filtros.nm_editor && typeof filtros.nm_editor !== "undefined") {
        qry += 'AND NM_EDITOR LIKE "%' + filtros.nm_editor + '%"';
    }

    return new Promise((resolve, reject) => {
        db.query(qry, (err, results, fields) => {
            if(err) reject();
            resolve(results);
        })       
    })
}