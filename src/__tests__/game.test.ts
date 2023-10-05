// game.test.ts

import { Game } from '../models/game'; 

describe('Game Interface', () => {
  it('should create a game object with the correct properties', () => {
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
    expect(game.playerId).toBe(2);
    expect(game.diceValue1).toBe(3);
    expect(game.diceValue2).toBe(4);
    expect(game.result).toBe(7);
    expect(game.win).toBe(true);
    expect(game.createdAt).toEqual(new Date('2023-10-04T10:35:40Z'));
    expect(game.updatedAt).toEqual(new Date('2023-10-04T10:35:40Z'));
  });
});