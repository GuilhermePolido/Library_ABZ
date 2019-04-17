/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('disciplina', {
		CD_DISCIPLINA: {
			type: DataTypes.STRING(6),
			allowNull: false,
			primaryKey: true
		},
		NM_DISCIPLINA: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		DS_PLANOENSINO: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		DT_MANUTENCAO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		tableName: 'disciplina'
	});
};
