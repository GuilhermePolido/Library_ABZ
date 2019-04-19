exports.create = async(estante) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO estante SET ?', estante, (err, results, fields) => {
            console.log(err)
            if(err) reject();
            resolve(true);
        })
    })
}

exports.get = async() => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM estante', function (err, results, fields) {
            if(err) reject();
            resolve(results);
        })
    })
}

exports.getEstanteAtual = async(id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM estante WHERE cd_administrador = ?', id, function (err, results, fields) {
            if(err) reject();
            resolve(results);
        })
    })
}

exports.delete = async(id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM estante WHERE cd_estante = ?', id, (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })       
    })
}