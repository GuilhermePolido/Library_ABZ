/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('usuario', {
		CD_USUARIO: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		DS_SENHA: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		DS_EMAIL: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		NM_USUARIO: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		NR_TELEFONE: {
			type: DataTypes.STRING(19),
			allowNull: true
		},
		DT_MANUTENCAO: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		tableName: 'usuario'
	});
};
