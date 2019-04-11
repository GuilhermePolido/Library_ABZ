/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('reserva', {
		CD_RESERVA: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		CD_LIVRO: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'livro',
				key: 'CD_LIVRO'
			}
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
		},
		DT_RESERVA: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		tableName: 'reserva'
	});
};
