exports.create = async (devolucao) => {
    delete devolucao.cd_livro;

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO devolucao SET ?', devolucao, (err, results, fields) => {
            if (err) reject();
            resolve(true);
        })
    })
}
