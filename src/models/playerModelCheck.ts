import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../../config/sequelize.config';

class Player extends Model {
  public id!: number;
  public name!: string;
  public password!: string;
  public wins!: number;
  public losses!: number;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Player',
    tableName: 'players',
    timestamps: false,
  }
);

export default Player;
