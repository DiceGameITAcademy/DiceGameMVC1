const { DataTypes, MockSequelize } = require('sequelize-mock');
const { GameDb } = require('../models/gameModel');

describe('GameDb Model', () => {
  const mockDb = new MockSequelize();
  const Game = mockDb.define('Games', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    diceValue1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diceValue2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    result: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    win: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: mockDb.fn('NOW'),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: mockDb.fn('NOW'),
      allowNull: false,
    },
    playerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'players',
        key: 'id',
      },
      allowNull: false,
    },
  });

  beforeAll(() => {
    mockDb.models.Games = Game;
  });


  it('should create a game instance', async () => {
    const gameData = {
      diceValue1: 1,
      diceValue2: 2,
      result: 3,
      win: true,
      playerId: 1,
    };
  
    const game = await Game.create(gameData);
  
    // Asegurarse de que el juego se haya creado correctamente
    expect(game).toBeDefined();
    expect(game.diceValue1).toBe(gameData.diceValue1);
    expect(game.diceValue2).toBe(gameData.diceValue2);
    expect(game.result).toBe(gameData.result);
    expect(game.win).toBe(gameData.win);
    expect(game.playerId).toBe(gameData.playerId);
  
    // Asegurarse de que las fechas se hayan establecido correctamente
    expect(game.createdAt).toBeDefined();
    expect(game.updatedAt).toBeDefined();
  
    // Asegurarse de que las fechas sean del tipo Date
    expect(game.createdAt instanceof Date).toBe(true);
    expect(game.updatedAt instanceof Date).toBe(true);
  
    // Asegurarse de que las fechas de creación y actualización sean aproximadamente iguales
    const createdAtTimestamp = game.createdAt.getTime();
    const updatedAtTimestamp = game.updatedAt.getTime();
    expect(updatedAtTimestamp - createdAtTimestamp).toBeLessThanOrEqual(1000); // Menos de 1 segundo de diferencia
  });
  
});
