import { Request, Response, NextFunction } from "express";
import Player from "../models/playerModelCheck";
import { CreatePlayerRequest } from "../types/playerTypes";

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

// export async function createPlayer(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { name, password }: CreatePlayerRequest = req.body; // Adjust type as needed

//     if (!name) {
//       name = "ANONYMOUS";
//     }

//     const existingPlayer = await Player.findOne({ where: { name } });
//     if (existingPlayer) {
//       return res
//         .status(400)
//         .json({ error: "Player already exists, choose other name" });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ error: "Password should be at least 6 characters long" });
//     }

//     const newPlayer = await Player.create({ name, password });

//     res
//       .status(201)
//       .json({ message: "Player created successfully", player: newPlayer });

//     next();
//   } catch (error) {
//     console.error("Error creating player:", error);
//     res.status(500).json({ error: "Internal server error" });

//     next(error);
//   }
// }
