/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('logusuario', {
		CD_LOG: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		DS_LOG: {
			type: DataTypes.STRING(255),
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
		},
		HR_LOG: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'logusuario'
	});
};
