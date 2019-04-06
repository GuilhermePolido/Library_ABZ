exports.create = async(livro) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO livro SET ?', livro, (err, results, fields) => {
            if(err) reject();
        })
    })
}

exports.get = async() => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from teste', function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        })
    })
}