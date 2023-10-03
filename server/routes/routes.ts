import {
  createPlayer,
  getAllPlayers,
  modifyPlayerName,
  playerLogin,
  playerLogout,
} from "../../src/controllers/PlayerControllerCheck";
import express from "express";

export const router = express.Router();

router.post("/api/player/login", playerLogin)

router.post("/api/players", createPlayer);

router.get("/api/getPlayers", getAllPlayers);

router.put("/api/players/:id", modifyPlayerName);

router.post("/api/player/logout", playerLogout)
