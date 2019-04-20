/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('capalivro', {
		CD_CAPALIVRO: {
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
		DS_LOCALCAPA: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		DS_LOCALLATERAL: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		DT_MANUTENCAO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		tableName: 'capalivro'
	});
};
