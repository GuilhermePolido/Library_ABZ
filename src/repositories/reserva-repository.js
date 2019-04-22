exports.create = async(reserva) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO reserva SET ?', reserva, (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })
    })
}

exports.get = async (livro) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM reserva WHERE cd_livro = ?', livro, function (err, results, fields) {
            if (err) reject();
            resolve(results);
        })
    })
}

exports.delete = async (reserva) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM reserva WHERE cd_reserva = ?', reserva, (err, results, fields) => {
            if (err) reject();
            resolve(true);
        })
    })
}