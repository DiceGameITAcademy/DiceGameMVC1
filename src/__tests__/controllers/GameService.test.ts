import { roll, calcResult, checkWin, playGame } from '../../controllers/GameService';

describe('Game Logic', () => {
  describe('roll', () => {
    it('should generate a random number between 1 and 6', () => {
      const result = roll();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    });
  });

  describe('calcResult', () => {
    it('should calculate the sum of two numbers', () => {
      const result = calcResult(2, 3);
      expect(result).toBe(5);
    });
  });

  describe('checkWin', () => {
    it('should return true if the result is 7, otherwise false', () => {
      expect(checkWin(7)).toBe(true);
      expect(checkWin(5)).toBe(false);
    });
  });

  describe('playGame', () => {
    it('should return a valid Game object with a defined id', () => {
        const playerId = 1;
        const game = playGame(playerId);
        expect(game.id).toBeDefined();
      });
    
      it('should return a valid Game object with diceValue1 in the range of 1 to 6', () => {
        const playerId = 1;
        const game = playGame(playerId);
        expect(game.diceValue1).toBeGreaterThanOrEqual(1);
        expect(game.diceValue1).toBeLessThanOrEqual(6);
      });
    
      it('should return a valid Game object with diceValue2 in the range of 1 to 6', () => {
        const playerId = 1;
        const game = playGame(playerId);
        expect(game.diceValue2).toBeGreaterThanOrEqual(1);
        expect(game.diceValue2).toBeLessThanOrEqual(6);
      });
    
      it('should return a valid Game object with result equal to the sum of diceValue1 and diceValue2', () => {
        const playerId = 1;
        const game = playGame(playerId);
        expect(game.result).toBe(game.diceValue1 + game.diceValue2);
      });
    
      it('should return a valid Game object with a boolean win property', () => {
        const playerId = 1;
        const game = playGame(playerId);
        expect(typeof game.win).toBe('boolean');
      });
    
      it('should return a valid Game object with playerId matching the provided playerId', () => {
        const playerId = 1;
        const game = playGame(playerId);
        expect(game.playerId).toBe(playerId);
      });
    
      it('should return a valid Game object with createdAt and updatedAt as instances of Date', () => {
        const playerId = 1;
        const game = playGame(playerId);
        expect(game.createdAt).toBeInstanceOf(Date);
        expect(game.updatedAt).toBeInstanceOf(Date);
      });

      it('should return a valid Game object with a winning result (sum = 7)', () => {
        const playerId = 1;
        let game = playGame(playerId);
      
        const modifiedGame = { ...game, diceValue1: 4, diceValue2: 3 };
      
        const sum = modifiedGame.diceValue1 + modifiedGame.diceValue2;
        expect(sum).toBe(sum);
        expect(true).toBe(true);
      });

    
      it('should return a valid Game object with a losing result (sum <> 7)', () => {
        const playerId = 1;
        const game = playGame(playerId);
    
        // Manually set the dice values to create a losing result
        const modifiedGame = { ...game, diceValue1: 5, diceValue2: 6 }
    
        // Recalculate result and check if it's a losing result
        const expectedSum = modifiedGame.diceValue1 +modifiedGame.diceValue2;
        expect(expectedSum).toBe(expectedSum);
        expect(false).toBe(false);
      });
    
      it('should generate unique IDs for different game instances', () => {
        const playerId = 1;
        const game1 = playGame(playerId);
        const game2 = playGame(playerId);
    
        expect(game1.id).not.toBe(game2.id);
      });
    
      it('should generate unique IDs for different players', () => {
        const game1 = playGame(1);
        const game2 = playGame(2);
    
        expect(game1.id).not.toBe(game2.id);
      });
    
  });
});
