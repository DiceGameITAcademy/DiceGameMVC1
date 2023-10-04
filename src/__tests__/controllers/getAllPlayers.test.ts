import { Request, Response } from "express";
import { getAllPlayers } from "../../../src/controllers/PlayerControllerCheck";
import Player from "../../../src/models/playerModelCheck";

describe("test the getAllPlayers function", () => {
  it("should return all players when there are no errors", async () => {
    const players = [
      { id: 1, name: "Player 1" },
      { id: 2, name: "Player 2" },
    ];
    Player.findAll = jest.fn().mockResolvedValue(players);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    await getAllPlayers(req, res, next);

    expect(Player.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ players });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return a 200 status code", async () => {
    const players = [
      { id: 1, name: "Player 1" },
      { id: 2, name: "Player 2" },
    ];
    Player.findAll = jest.fn().mockResolvedValue(players);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    await getAllPlayers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return a JSON object with players array", async () => {
    const players = [
      { id: 1, name: "Player 1" },
      { id: 2, name: "Player 2" },
    ];
    Player.findAll = jest.fn().mockResolvedValue(players);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    await getAllPlayers(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ players });
  });

  it("should return a 500 status code when there is an error", async () => {
    Player.findAll = jest.fn().mockRejectedValue(new Error("Database error"));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    await getAllPlayers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("should call the next function with the error", async () => {
    Player.findAll = jest.fn().mockRejectedValue(new Error("Database error"));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    await getAllPlayers(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error("Database error"));
  });

  it("should catch and log errors", async () => {
    const error = new Error("Database error");
    Player.findAll = jest.fn().mockRejectedValue(error);
    console.error = jest.fn();

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    await getAllPlayers(req, res, next);

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching players:",
      error
    );
  });
});

// npx jest src/__tests__/controllers/getAllPlayers.test.ts
