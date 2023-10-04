import { Game } from '../models/game'

export const roll = () => {
	return Math.floor(Math.random() * 6) + 1;
};

export const calcResult = (roll1: number, roll2: number) => {
	return roll1 + roll2;
};

export const checkWin = (result: number) => {
     if (result === 7) return true  
        else return false
}   

export const playGame = (id:number): Game => {
    if(typeof id !== 'number') throw new Error('id must be a number'
    )
	const gameId = Math.random() * 1000;
	const diceValue1: number = roll();
	const diceValue2: number = roll();
	const result: number = calcResult(diceValue1,diceValue2);
	const win: boolean = checkWin(result);
	const playerId: number = id;


	const gameResult: Game = {
        id : gameId,
		diceValue1,
		diceValue2,
		result,
        win,
		playerId,
        createdAt: new Date(),
        updatedAt: new Date()
	};

	return gameResult;
};