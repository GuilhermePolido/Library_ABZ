/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('devolucao', {
		CD_DEVOLUCAO: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		CD_EMPRESTIMO: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'emprestimo',
				key: 'CD_EMPRESTIMO'
			}
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
		DT_MANUTENCAO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		tableName: 'devolucao'
	});
};
