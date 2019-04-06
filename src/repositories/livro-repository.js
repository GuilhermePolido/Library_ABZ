db.connect();

exports.create = async(livro) => {
    var qry = 'INSERT INTO LIVRO(NM_LIVRO) VALUES (`${livro.nome}`)';
    db.query(qry, (err, results, fields) => {
        if(err) throw error;
    })
}

exports.get = async() => {
    return new Promisse((resolve, reject) => {
        db.query('SELECT * from teste', function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        })
    })
}

db.end(); 