import { DataTypes,Model, Sequelize } from 'sequelize';
import  sequelize  from '../../config/sequelize.config';

class Game extends Model {
	public id!: number;
	public diceValue1!: number;
	public diceValue2!: number;
	public result!: number;
	public win!: boolean;
    public playerId!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Game.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	diceValue1: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	diceValue2: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	result: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	win: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	},
	playerId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'players',
			key: 'id'
		},
		allowNull: false
	},
},
    {
        sequelize,
        modelName: 'Game',
        tableName: 'games',
        timestamps: false,
    }
);

export default Game;