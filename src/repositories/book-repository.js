db.connect();

exports.create = async(book) => {
    var qry = 'INSERT INTO LIVRO(NM_LIVRO) VALUES (`${book.name}`)';
    db.query(qry, (err, results, fields) => {
        if(err) throw error;
    })
}

exports.get = async() => {
    return new Promisse((resolve, reject) => {
        db.query('SELECT * from livro', function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        })
    })
}

db.end();