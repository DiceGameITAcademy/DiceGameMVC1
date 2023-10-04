// import { Request, Response } from "express";
// import { getAllPlayers } from "../../controllers/PlayerControllerCheck";
// import Player from "src/models/playerModelCheck";

// describe('getAllPlayers', () => {
//   it('should return a list of all players in the database', async () => {
//     const mockPlayers = [
//       { id: 1, name: 'Player 1', password: 'password1', wins: 0, losses: 0 },
//       { id: 2, name: 'Player 2', password: 'password2', wins: 0, losses: 0 },
//       { id: 3, name: 'Player 3', password: 'password3', wins: 0, losses: 0 }
//     ];

//     Player.findAll = jest.fn().mockResolvedValue(mockPlayers);

//     const req = {} as Request;
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     } as unknown as Response;
//     const next = jest.fn();

//     await getAllPlayers(req, res, next);

//     expect(Player.findAll).toHaveBeenCalledWith({});
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ players: mockPlayers });
//     expect(next).not.toHaveBeenCalled();
//   });
// });