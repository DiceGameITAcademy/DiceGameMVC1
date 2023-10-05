// game.test.ts

import { Game } from '../../../src/models/game'

describe('Game Interface', () => {
  it('should create a game object with the correct id', () => {
    const game: Game = {
      id: 1,
      playerId: 2,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      createdAt: new Date('2023-10-04T10:35:40Z'),
      updatedAt: new Date('2023-10-04T10:35:40Z'),
    };

    expect(game.id).toBe(1);
  });

  it('should create a game object with the correct playerId', () => {
    const game: Game = {
      id: 1,
      playerId: 2,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      createdAt: new Date('2023-10-04T10:35:40Z'),
      updatedAt: new Date('2023-10-04T10:35:40Z'),
    };

    expect(game.playerId).toBe(2);
  });

  it('should create a game object with the correct diceValue1', () => {
    const game: Game = {
      id: 1,
      playerId: 2,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      createdAt: new Date('2023-10-04T10:35:40Z'),
      updatedAt: new Date('2023-10-04T10:35:40Z'),
    };

    expect(game.diceValue1).toBe(3);
  });

  it('should create a game object with the correct diceValue2', () => {
    const game: Game = {
      id: 1,
      playerId: 2,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      createdAt: new Date('2023-10-04T10:35:40Z'),
      updatedAt: new Date('2023-10-04T10:35:40Z'),
    };

    expect(game.diceValue2).toBe(4);
  });

  it('should create a game object with the correct result', () => {
    const game: Game = {
      id: 1,
      playerId: 2,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      createdAt: new Date('2023-10-04T10:35:40Z'),
      updatedAt: new Date('2023-10-04T10:35:40Z'),
    };

    expect(game.result).toBe(7);
  });

  it('should create a game object with the correct win', () => {
    const game: Game = {
      id: 1,
      playerId: 2,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      createdAt: new Date('2023-10-04T10:35:40Z'),
      updatedAt: new Date('2023-10-04T10:35:40Z'),
    };

    expect(game.win).toBe(true);
  });

  it('should create a game object with the correct createdAt', () => {
    const game: Game = {
      id: 1,
      playerId: 2,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      createdAt: new Date('2023-10-04T10:35:40Z'),
      updatedAt: new Date('2023-10-04T10:35:40Z'),
    };

    expect(game.createdAt).toEqual(new Date('2023-10-04T10:35:40Z'));
  });

  it('should create a game object with the correct updatedAt', () => {
    const game: Game = {
      id: 1,
      playerId: 2,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      createdAt: new Date('2023-10-04T10:35:40Z'),
      updatedAt: new Date('2023-10-04T10:35:40Z'),
    };

    expect(game.updatedAt).toEqual(new Date('2023-10-04T10:35:40Z'));
  });
});