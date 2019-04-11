/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('estante', {
		CD_ESTANTE: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		CD_ADMINISTRADOR: {
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
		tableName: 'estante'
	});
};
