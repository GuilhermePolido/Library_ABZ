/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Livro', {
		CD_LIVRO: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		DS_TITULO: {
			type: DataTypes.STRING(80),
			allowNull: true
		},
		NM_AUTOR: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		NM_EDITOR: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		NR_PAGINA: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		QT_LIVRO: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		NR_CLASSIFICACAO: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		DS_SUMARIO: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		DT_MANUTENCAO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		CD_ESTANTE: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'estante',
				key: 'CD_ESTANTE'
			}
		},
		ST_LIVRO: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'livro'
	});
};
