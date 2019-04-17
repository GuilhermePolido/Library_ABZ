/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('emprestimo', {
		CD_EMPRESTIMO: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		DT_DEVOLUCAO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		CD_USUARIO: {
			type: DataTypes.STRING(50),
			allowNull: false,
			references: {
				model: 'usuario',
				key: 'CD_USUARIO'
			}
		},
		DT_EMPRESTIMO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		DT_MANUTENCAO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		LIVRO_CD_LIVRO: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'livro',
				key: 'CD_LIVRO'
			}
		}
	}, {
		tableName: 'emprestimo'
	});
};
