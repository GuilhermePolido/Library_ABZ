exports.create = async (emprestimo) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO emprestimo SET ?', emprestimo, (err, results, fields) => {
            console.log(err);
            if (err) reject();
            resolve(true);
        })
    })
}

exports.find = async (livro, usuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT cd_emprestimo FROM emprestimo WHERE cd_livro = ? AND cd_usuario = ? AND dt_devolucao is null', [livro, usuario], (err, results, fields) => {
            if (err) reject();
            resolve(results[0]);
        })
    })
}

exports.devolucao = async(emprestimo, dt_devolucao) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE emprestimo SET dt_devolucao = ? WHERE cd_emprestimo = ?', [dt_devolucao, emprestimo], (err, results, fields) => {
            if(err) reject();
            resolve(true);
        })       
    })
}