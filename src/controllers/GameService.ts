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

export const playGame = (id: number): Game => {
	const diceValue1: number = roll();
	const diceValue2: number = roll();
	const result: number = calcResult(diceValue1,diceValue2);
	const win: boolean = checkWin(result);
	const playerId: number = id;


	const gameResult: Game = {
		diceValue1,
		diceValue2,
		result,
        win,
		playerId
	};

	return gameResult;
};