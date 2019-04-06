exports.create = async(livro) => {
    db.query('INSERT INTO livro SET ?', livro, (err, results, fields) => {
        if(err) throw err;
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