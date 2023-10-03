import {
  createPlayer,
  getAllPlayers,
  modifyPlayerName,
} from "../../src/controllers/PlayerControllerCheck";
import express from "express";

export const router = express.Router();

router.post("/api/players", createPlayer);

router.get("/api/getPlayers", getAllPlayers);

router.put("/api/players/:id", modifyPlayerName);
