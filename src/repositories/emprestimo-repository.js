exports.create = async (emprestimo) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO emprestimo SET ?', emprestimo, (err, results, fields) => {
            if (err) reject();
            resolve(true);
        })
    })
}
