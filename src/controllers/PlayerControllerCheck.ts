import { Request, Response, NextFunction } from "express";
import Player from "../models/playerModelCheck";
import { CreatePlayerRequest } from "../types/playerTypes";
import {GameDb} from '../models/gameModel'; '../models/GameModel';
import { playGame } from './GameService'; '../controllers/GameService';

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
      return res
        .status(400)
        .json({ error: "Player already exists, choose another name" });
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

//Play game for a player

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

    res.status(200).json({ message: "Game played successfully", game: newGame });
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
    const winningGames = await GameDb.findAll({ where: { playerId, win: true } });
    const winningPercentage = (winningGames.length / games.length) * 100;

    res.status(200).json({ winningPercentage });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}
// Get average win percentage for all players

export async function getAverageWinningPercentage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await Player.findAll();
    let totalWinningPercentage = 0;
    for (let i = 0; i < players.length; i++) {
      const games = await GameDb.findAll({ where: { playerId: players[i].id } });
      const winningGames = await GameDb.findAll({ where: { playerId: players[i].id, win: true } });
      const winningPercentage = (winningGames.length / games.length) * 100;
      totalWinningPercentage += winningPercentage;
    }
    const averageWinningPercentage = totalWinningPercentage / players.length;

    res.status(200).json({ averageWinningPercentage });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//get ranking of players based on wins

export async function getRanking(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await Player.findAll();
    let ranking = [];
    for (let i = 0; i < players.length; i++) {
      const games = await GameDb.findAll({ where: { playerId: players[i].id } });
      const winningGames = await GameDb.findAll({ where: { playerId: players[i].id, win: true } });
      const winningPercentage = (winningGames.length / games.length) * 100;
      ranking.push({ name: players[i].name, winningPercentage });
    }
    ranking.sort((a, b) => b.winningPercentage - a.winningPercentage);
    res.status(200).json({ ranking });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//get ranking of players based on losses

export async function getRankingLosses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await Player.findAll();
    let ranking = [];
    for (let i = 0; i < players.length; i++) {
      const games = await GameDb.findAll({ where: { playerId: players[i].id } });
      const losingGames = await GameDb.findAll({ where: { playerId: players[i].id, win: false } });
      const losingPercentage = (losingGames.length / games.length) * 100;
      ranking.push({ name: players[i].name, losingPercentage });
    }
    ranking.sort((a, b) => b.losingPercentage - a.losingPercentage);
    res.status(200).json({ ranking });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}

//get ranking of players based on average win percentage

export async function getRankingAverage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await Player.findAll();
    let ranking = [];
    for (let i = 0; i < players.length; i++) {
      const games = await GameDb.findAll({ where: { playerId: players[i].id } });
      const winningGames = await GameDb.findAll({ where: { playerId: players[i].id, win: true } });
      const winningPercentage = (winningGames.length / games.length) * 100;
      ranking.push({ name: players[i].name, winningPercentage });
    }
    ranking.sort((a, b) => b.winningPercentage - a.winningPercentage);
    res.status(200).json({ ranking });
  } catch (error) {
    console.error("Error fetching player games:", error);
    res.status(500).json({ error: "Internal server error" });

    next(error);
  }
}


