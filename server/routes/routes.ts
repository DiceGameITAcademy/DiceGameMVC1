import {
  createPlayer,
  getAllPlayers,
  modifyPlayerName,
  deletePlayer,
  playGameForPlayer,
  getPlayerGames,
  playerLogin,
  playerLogout,
  deletePlayerGames,
  getRankingAverage,
  getRanking,
  getRankingLosses,
} from "../../src/controllers/PlayerControllerCheck";
import express from "express";

export const router = express.Router();

router.post("/api/player/login", playerLogin)

router.post("/api/players", createPlayer);

router.get("/api/getPlayers", getAllPlayers);

router.put("/api/players/:id", modifyPlayerName);

router.post("/api/player/logout", playerLogout)

router.delete("/api/player/delete/:id", deletePlayer)

router.post("/api/game/:id", playGameForPlayer)

router.get("/api/game/:id", getPlayerGames)

router.delete("/api/game/:id", deletePlayerGames)

router.get("/api/ranking", getRankingAverage)

router.get("/api/ranking/winner", getRanking)

router.get("api/ranking/loser", getRankingLosses)


