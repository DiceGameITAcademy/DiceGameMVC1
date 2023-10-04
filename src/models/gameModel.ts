import { DataTypes,Model, Sequelize } from 'sequelize';
import  sequelize  from '../../config/sequelize.config';

interface GameAttributes{
	id: number;
	diceValue1: number;
	diceValue2: number;
	result: number;
	win: boolean;
    playerId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface GameInstance extends Model<GameAttributes>, GameAttributes {}

export const GameDb = sequelize.define<GameInstance>('Games', {
    id: {
        type: DataTypes.BIGINT,
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
	}
});

GameDb.sync()