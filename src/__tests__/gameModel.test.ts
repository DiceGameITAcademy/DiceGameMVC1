import { GameDb } from "../models/gameModel";


describe("GameModel should", () => {
  it("should save Game model to the database", async () => {
    const gameData = {
      id: 1,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      playerId: 1,
      createdAt: new Date(),
	  updatedAt: new Date()
    };

    const game = await GameDb.create(gameData);

    expect(game.diceValue1).toBe(3);
    expect(game.diceValue2).toBe(4);
    expect(game.result).toBe(7);
    expect(game.win).toBe(true);
  });

  it("should not save Game model to the database without a playerId", async () => {
    const gameData = {
      id: 1,
      diceValue1: 3,
      diceValue2: 4,
      result: 7,
      win: true,
      playerId: 1,
      createdAt: new Date(),
	  updatedAt: new Date()
    };

    await expect(GameDb.create(gameData)).rejects.toThrow();
  });

  it("should delete a game successfully", async () => {
    const gameData = {
        id: 1,
        diceValue1: 3,
        diceValue2: 4,
        result: 7,
        win: true,
        playerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const game = await GameDb.create(gameData);

    await game.destroy();

    const deletedGame = await GameDb.findByPk(game.id);

    expect(deletedGame).toBeNull();
  });

});
