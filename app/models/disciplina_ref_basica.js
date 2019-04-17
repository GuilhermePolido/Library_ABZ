/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('disciplina_ref_basica', {
		CD_DISCIPLINA: {
			type: DataTypes.STRING(6),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'disciplina',
				key: 'CD_DISCIPLINA'
			}
		},
		CD_LIVRO: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'livro',
				key: 'CD_LIVRO'
			}
		},
		DT_MANUTENCAO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		tableName: 'disciplina_ref_basica'
	});
};
