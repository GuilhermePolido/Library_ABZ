exports.get = async() => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM disciplina', function (err, results, fields) {
            if(err) reject();
            resolve(results);
        })
    })
}