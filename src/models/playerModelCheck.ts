import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../../config/sequelize.config';

class Player extends Model {
  public id!: number;
  public name!: string;
  public password!: string;
  public wins!: number;
  public losses!: number;

  // Define other fields as needed

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Player.init(
  {
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
    // Define other fields as needed
  },
  {
    sequelize,
    modelName: 'Player',
    tableName: 'players',
    timestamps: false,
  }
);

export default Player;
