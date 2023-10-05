import { Request, Response, NextFunction } from "express";
import {

  getAllPlayers,
  modifyPlayerName,
  playGameForPlayer,
  getPlayerGames,
  deletePlayerGames,
  deletePlayer,
  getRanking,
  getRankingAverage,
  getRankingLosses,
} from "../../controllers/PlayerControllerCheck";
import Player from "../../models/playerModelCheck";
import { GameDb } from "../../models/gameModel";


describe("Player API", () => {
  beforeAll(async () => {
    // Configurar cualquier configuración necesaria antes de las pruebas
  });

  afterAll(async () => {
    // Realizar limpieza después de todas las pruebas
  });

  beforeEach(async () => {
    // Configurar cualquier estado necesario antes de cada prueba
    await Player.sync({ force: true });
    await GameDb.sync({ force: true });
  });

  afterEach(async () => {
    // Limpiar cualquier estado después de cada prueba
  });

  describe("getAllPlayers", () => {
    it("should get all players", async () => {
      // Crear jugadores para la prueba
      await Player.bulkCreate([
        { name: "Player1", password: "password1" },
        { name: "Player2", password: "password2" },
      ]);

      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();

      await getAllPlayers(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          players: expect.arrayContaining([
            expect.objectContaining({ name: "Player1" }),
            expect.objectContaining({ name: "Player2" }),
          ]),
        })
      );
    });    
  });


  describe("deletePlayer", () => {
    it("should delete a player", async () => {
      const player = await Player.create({
        name: "PlayerToDelete",
        password: "password",
      });

      const req: Partial<Request> = { params: { id: player.id.toString() } };
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();

      await deletePlayer(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Player deleted successfully" })
      );

      const deletedPlayer = await Player.findByPk(player.id);
      expect(deletedPlayer).toBeNull();
    });

    it("should handle non-existent player", async () => {
      const req: Partial<Request> = { params: { id: "999" } };
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();

      await deletePlayer(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: "Player not found" })
      );
    });
  });

  describe("modifyPlayerName", () => {
    it("should modify the player's name", async () => {
      const player = await Player.create({
        name: "OldName",
        password: "password",
      });
  
      const req: Partial<Request> = {
        params: { id: player.id.toString() },
        body: { name: "NewName" },
      };
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();
  
      await modifyPlayerName(req as Request, res as Response, next);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Player name updated successfully",
          player: expect.objectContaining({ name: "NewName" }),
        })
      );
  
      const updatedPlayer = await Player.findByPk(player.id);
      expect(updatedPlayer?.name).toBe("NewName");
    });
  
    it("should handle non-existent player", async () => {
      const req: Partial<Request> = { params: { id: "999" }, body: { name: "NewName" } };
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();
  
      await modifyPlayerName(req as Request, res as Response, next);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: "Player not found" })
      );
    });
  
    
  });
  describe("playGameForPlayer", () => {
    it("should play a game for the player", async () => {
      const player = await Player.create({
        name: "TestPlayer",
        password: "password",
      });
  
      const req: Partial<Request> = {
        params: { id: player.id.toString() },
      };
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();
  
      await playGameForPlayer(req as Request, res as Response, next);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Game played successfully",
          game: expect.objectContaining({
            diceValue1: expect.any(Number),
            diceValue2: expect.any(Number),
            result: expect.any(Number),
            win: expect.any(Boolean),
          }),
        })
      );
    });
  
    it("should handle non-existent player", async () => {
      const req: Partial<Request> = { params: { id: "999" } };
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();
  
      await playGameForPlayer(req as Request, res as Response, next);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: "Player not found" })
      );
    });
  
    
  });

  describe("deletePlayerGames", () => {
  it("should delete all games for the player", async () => {
    const player = await Player.create({
      name: "TestPlayer",
      password: "password",
    });

   
    await GameDb.create({
        id: 3,
      diceValue1: 1,
      diceValue2: 2,
      result: 3,
      win: true,
      playerId: player.id,
      createdAt: new Date(),
        updatedAt: new Date()

    });
    await GameDb.create({
        id: 1,
      diceValue1: 4,
      diceValue2: 5,
      result: 9,
      win: false,
      playerId: player.id,
      createdAt: new Date(),
        updatedAt: new Date()
    });

    const req: Partial<Request> = {
      params: { id: player.id.toString() },
    };
    const res: Partial<Response> = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    await deletePlayerGames(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Games deleted successfully" })
    );

    const gamesAfterDeletion = await GameDb.findAll({ where: { playerId: player.id } });
    expect(gamesAfterDeletion.length).toBe(0);
  });

  it("should handle non-existent player", async () => {
    const req: Partial<Request> = { params: { id: "999" } };
    const res: Partial<Response> = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    await deletePlayerGames(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Player not found" })
    );
  });

  
});

describe("getPlayerGames", () => {
    it("should get all games for a player", async () => {
      const player = await Player.create({
        name: "TestPlayer",
        password: "password",
      });
  
      const gameData1 = {
        id:4,
        diceValue1: 3,
        diceValue2: 4,
        result: 7,
        win: true,
        playerId: player.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      const gameData2 = {
        id: 2,
        diceValue1: 1,
        diceValue2: 2,
        result: 3,
        win: false,
        playerId: player.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      await GameDb.create(gameData1);
      await GameDb.create(gameData2);
  
      const req: Partial<Request> = {
        params: { id: player.id.toString() },
      };
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();
  
      await getPlayerGames(req as Request, res as Response, next);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          games: expect.arrayContaining([
            expect.objectContaining({
              diceValue1: gameData1.diceValue1,
              diceValue2: gameData1.diceValue2,
              result: gameData1.result,
              win: gameData1.win,
              playerId: gameData1.playerId,
              id: expect.any(Number),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }),
            expect.objectContaining({
              diceValue1: gameData2.diceValue1,
              diceValue2: gameData2.diceValue2,
              result: gameData2.result,
              win: gameData2.win,
              playerId: gameData2.playerId,
              id: expect.any(Number),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }),
          ]),
        })
      );
    });
  
    it("should handle non-existent player", async () => {
      const req: Partial<Request> = { params: { id: "999" } };
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();
  
      await getPlayerGames(req as Request, res as Response, next);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: "Player not found" })
      );
    });
  
  });
  
  describe("getRanking", () => {
    it("should get ranking of players based on wins", async () => {
      const player1 = await Player.create({ name: "Player1", password: "pass1" });
      const player2 = await Player.create({ name: "Player2", password: "pass2" });
  
      const gameData1 = {
        id: 1, // Ajusta el ID según tu lógica
        diceValue1: 3,
        diceValue2: 4,
        result: 7,
        win: true,
        playerId: player1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const gameData2 = {
        id: 2, // Ajusta el ID según tu lógica
        diceValue1: 1,
        diceValue2: 2,
        result: 3,
        win: true,
        playerId: player1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const gameData3 = {
        id: 3, // Ajusta el ID según tu lógica
        diceValue1: 1,
        diceValue2: 2,
        result: 3,
        win: true,
        playerId: player2.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      await GameDb.create(gameData1);
      await GameDb.create(gameData2);
      await GameDb.create(gameData3);
  
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();
  
      await getRanking(req as Request, res as Response, next);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ranking: expect.arrayContaining([
            expect.objectContaining({
              name: player1.name,
              numberOfWins: 2,
            }),
            expect.objectContaining({
              name: player2.name,
              numberOfWins: 1,
            }),
          ]),
        })
      );
    });
  });
  
  describe("getRankingAverage", () => {
    it("should get ranking of players based on average win percentage", async () => {
      // Crear jugadores y juegos de prueba
      const player1 = await Player.create({
        name: "Player1",
        password: "password1",
      });
      const player2 = await Player.create({
        name: "Player2",
        password: "password2",
      });
  
      const gameData1 = {
        id: 1, 
        diceValue1: 3,
        diceValue2: 4,
        result: 7,
        win: true,
        playerId: player1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const gameData2 = {
        id: 2, 
        diceValue1: 1,
        diceValue2: 2,
        result: 3,
        win: true,
        playerId: player1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const gameData3 = {
        id: 3, 
        diceValue1: 1,
        diceValue2: 2,
        result: 3,
        win: false,
        playerId: player2.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      await GameDb.create(gameData1);
      await GameDb.create(gameData2);
      await GameDb.create(gameData3);
  
      // Mock para Express
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();
  
      // Llamar a la función
      await getRankingAverage(req as Request, res as Response, next);
  
      // Verificar resultados
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ranking: expect.arrayContaining([
            expect.objectContaining({
              name: player1.name,
              winningPercentage: 100, 
            }),
            expect.objectContaining({
              name: player2.name,
              winningPercentage: 0, 
            }),
          ]),
        })
      );
    });
  
   
  });
  
  describe("getRankingLosses", () => {
    it("should get ranking of players based on losses", async () => {
      // Crear jugadores y juegos de prueba
      const player1 = await Player.create({
        name: "Player1",
        password: "password1",
      });
      const player2 = await Player.create({
        name: "Player2",
        password: "password2",
      });
  
      const gameData1 = {
        id: 1, // Ajusta el ID según tu lógica
        diceValue1: 3,
        diceValue2: 4,
        result: 7,
        win: true,
        playerId: player1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const gameData2 = {
        id: 2, // Ajusta el ID según tu lógica
        diceValue1: 1,
        diceValue2: 2,
        result: 3,
        win: false,
        playerId: player1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const gameData3 = {
        id: 3, // Ajusta el ID según tu lógica
        diceValue1: 1,
        diceValue2: 2,
        result: 3,
        win: false,
        playerId: player2.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      await GameDb.create(gameData1);
      await GameDb.create(gameData2);
      await GameDb.create(gameData3);
  
      // Mock para Express
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();
  
      // Llamar a la función
      await getRankingLosses(req as Request, res as Response, next);
  
      // Verificar resultados
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ranking: expect.arrayContaining([
            expect.objectContaining({
              name: player1.name,
              numberOfLosses: 1, 
            }),
            expect.objectContaining({
              name: player2.name,
              numberOfLosses: 1, 
            }),
          ]),
        })
      );
    });
  
   
  });
  
  
   
  
});


