/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comentario', {
		CD_COMENTARIO: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		DS_COMENTARIO: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		CD_LIVRO: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'livro',
				key: 'CD_LIVRO'
			}
		},
		DT_MANUTENCAO: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		CD_USUARIO: {
			type: DataTypes.STRING(50),
			allowNull: true,
			references: {
				model: 'usuario',
				key: 'CD_USUARIO'
			}
		}
	}, {
		tableName: 'comentario'
	});
};
