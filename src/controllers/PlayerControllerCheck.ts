import { Request, Response, NextFunction } from "express";
import Player from "../models/playerModelCheck";
import { CreatePlayerRequest } from "../types/playerTypes";
import { GameDb } from "../models/gameModel";
("../models/GameModel");
import { playGame } from "./GameService";
("../controllers/GameService");

export async function createPlayer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { name, password }: CreatePlayerRequest = req.body;

    if (!name) {
      name = "ANONYMOUS";
    }

    const existingPlayer = await Player.findOne({ where: { name } });
    if (existingPlayer) {
      return res.status(400).json({
        error: "Player already exists, choose another name or go to log in",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be at least 6 characters long" });
    }

    const newPlayer = await Player.create({ name, password });

    res
      .status(201)
      .json({ message: "Player created successfully", player: newPlayer });

    next();
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

export async function getAllPlayers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await Player.findAll();

    res.status(200).json({ players });
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

export async function modifyPlayerName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const playerId = req.params.id;
    const { name }: { name: string } = req.body;

    const player = await Player.findOne({ where: { id: playerId } });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    player.name = name;
    await player.save();

    res
      .status(200)
      .json({ message: "Player name updated successfully", player });
  } catch (error) {
    console.error("Error modifying player name:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//Play game for a player
//REVISAR
//esta poniendo el id DEL JUGADOR EN EL ID DEL game I POR ESTO NO SE PUEDE VOLVER A HACER
export async function playGameForPlayer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const playerId = Number(req.params.id);

    const player = await Player.findOne({ where: { id: playerId } });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    const game = playGame(playerId);
    const newGame = await GameDb.create(game);

    res
      .status(200)
      .json({ message: "Game played successfully", game: newGame });
  } catch (error) {
    console.error("Error playing game:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//Get all games for a player
export async function getPlayerGames(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const playerId = req.params.id;
    const player = await Player.findOne({ where: { id: playerId } });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    const games = await GameDb.findAll({ where: { playerId } });

    res.status(200).json({ games });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//Delete all games for a player
export async function deletePlayerGames(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const playerId = req.params.id;
    const player = await Player.findOne({ where: { id: playerId } });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    await GameDb.destroy({ where: { playerId } });

    res.status(200).json({ message: "Games deleted successfully" });
  } catch (error) {
    console.error("Error deleting player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}
//winning games for a player

export async function getPlayerWinningGames(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const playerId = req.params.id;
    const player = await Player.findOne({ where: { id: playerId } });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    const games = await GameDb.findAll({ where: { playerId, win: true } });

    res.status(200).json({ games });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//losing games for a player

export async function getPlayerLosingGames(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const playerId = req.params.id;
    const player = await Player.findOne({ where: { id: playerId } });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    const games = await GameDb.findAll({ where: { playerId, win: false } });

    res.status(200).json({ games });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

export async function deletePlayer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const playerId = req.params.id;

    const player = await Player.findOne({ where: { id: playerId } });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    await player.destroy();

    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

// Get winning percentage for a player

export async function getPlayerWinningPercentage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const playerId = req.params.id;
    const player = await Player.findOne({ where: { id: playerId } });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    const games = await GameDb.findAll({ where: { playerId } });
    const winningGames = await GameDb.findAll({
      where: { playerId, win: true },
    });
    const winningPercentage = (winningGames.length / games.length) * 100;

    res.status(200).json({ winningPercentage });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//get ranking of players based on wins
//ORDENAR Y QUE SOLO SALGA EL NOMBRE Y EL numero de victorias

export async function getRanking(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await Player.findAll();

    const ranking = await Promise.all(
      players.map(async (player) => {
        const winningGames = await GameDb.findAll({
          where: { playerId: player.id, win: true },
        });

        const numberOfWins = winningGames.length;

        return { name: player.name, numberOfWins };
      })
    );

    ranking.sort((a, b) => b.numberOfWins - a.numberOfWins);

    res.status(200).json({ ranking });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//get ranking of players based on losses
//ORDENAR Y QUE SOLO SALGA EL NOMBRE Y EL NUMERO DE DERROTAS
//que funcionee!!!


export async function getRankingLosses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await Player.findAll();

    const ranking = await Promise.all(
      players.map(async (player) => {
        const losingGames = await GameDb.findAll({
          where: { playerId: player.id, win: false },
        });

        const numberOfLosses = losingGames.length;

        return { name: player.name, numberOfLosses };
      })
    );

    ranking.sort((a, b) => b.numberOfLosses - a.numberOfLosses);

    res.status(200).json({ ranking });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//get ranking of players based on average win percentage
//falta ordenar!!!

export async function getRankingAverage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await Player.findAll();

    const playerData = players.map(async (player) => {
      const games = await GameDb.findAll({ where: { playerId: player.id } });
      const winningGames = await GameDb.findAll({
        where: { playerId: player.id, win: true },
      });
      const winningPercentage = (winningGames.length / games.length) * 100;

      return {
        player,
        winningPercentage,
      };
    });

    const sortedPlayerData = (await Promise.all(playerData)).sort(
      (a, b) => b.winningPercentage - a.winningPercentage
    );

    const averageWinningPercentage =
      sortedPlayerData.reduce((acc, data) => acc + data.winningPercentage, 0) /
      players.length;

    res.status(200).json({ averageWinningPercentage, sortedPlayerData });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//LOGIN AND LOGOUT

export async function playerLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, password }: { name: string; password: string } = req.body;

    // Check if the player exists by name
    const player = await Player.findOne({ where: { name } });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    // Check if the provided password matches the player's password
    if (player.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Player is successfully logged in
    res.status(200).json({ message: "Player logged in successfully", player });
  } catch (error) {
    console.error("Error logging in player:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

export async function playerLogout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // You can perform any necessary logic for logging out a player here
    // For example, clearing session data or tokens

    // Respond with a success message
    res.status(200).json({ message: "Player logged out successfully" });
  } catch (error) {
    console.error("Error logging out player:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}
