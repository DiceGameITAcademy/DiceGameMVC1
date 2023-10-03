export interface Game{
    id: number;
    playerId: number;
    diceValue1:number;
    diceValue2:number;
    result:number;
    win:boolean
    createdAt: Date;
    updatedAt: Date;
}