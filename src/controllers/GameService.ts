
import { Game } from '../models/game'
import { v4 as uuidv4 } from 'uuid'

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
function generateRandomNumber() {
    const uuid = uuidv4();
    const hex = uuid.replace(/-/g, '').slice(0, 6);  // Tomar solo los primeros 15 caracteres
    const bigIntValue = BigInt('0x' + hex);
    return Number(bigIntValue);
}

export const playGame = (id:number): Game => {
    if(typeof id !== 'number') throw new Error('id must be a number'
    )
	const gameId :number = generateRandomNumber();
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

