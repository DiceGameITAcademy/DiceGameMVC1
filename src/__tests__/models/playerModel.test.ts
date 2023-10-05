import Player from "../../../src/models/playerModelCheck";

describe("PlayerModel should", () => {
  it("should save Player model to the database", async () => {
    const playerName: string = "Dillinger";
    const playerPassword: string = "alakulturin";

    const player = new Player();
    player.name = playerName;
    player.password = playerPassword;
    player.wins = 0;
    player.losses = 0;
    await player.save();
    expect(player.name).toBe("Dillinger");
    expect(player.password).toBe("alakulturin");
  });

  it("should update Player model in the database", async () => {
    const player = new Player();
    player.name = "Dillinger";
    player.password = "Alakulturin";
    player.wins = 0;
    player.losses = 0;
    await player.save();
    player.name = "Jane Smith";
    await player.save();
    expect(player.name).toBe("Jane Smith");
  });

  it("should not save Player model to the database without a name", async () => {
    const player = new Player();
    player.password = "password";
    player.wins = 0;
    player.losses = 0;
    await expect(player.save()).rejects.toThrow();
  });

  it("should not save Player model to the database without a password", async () => {
    const player = new Player();
    player.name = "Dillinger";
    player.wins = 0;
    player.losses = 0;
    await expect(player.save()).rejects.toThrow();
  });

  it("should create a player with all required fields", () => {
    const playerData = {
      name: "Dillinger",
      password: "Alakulturin",
    };

    const player = Player.build(playerData);

    expect(player.name).toBe(playerData.name);
    expect(player.password).toBe(playerData.password);
    expect(player.wins).toBe(0);
    expect(player.losses).toBe(0);
  });

  it("should delete a player successfully", async () => {
    const playerData = {
      name: "John Doe",
      password: "password123",
    };

    const player = await Player.create(playerData);

    await player.destroy();

    const deletedPlayer = await Player.findByPk(player.id);

    expect(deletedPlayer).toBeNull();
  });

  it("should not create a player without a name or password", async () => {
    const playerData = {
      name: "",
      password: "",
    };

    try {
      await Player.create(playerData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should create a player with default values for wins and losses", async () => {
    const playerData = {
      name: "Dillinger",
      password: "alakulturin",
    };

    const player = await Player.create(playerData);

    expect(player.wins).toBe(0);
    expect(player.losses).toBe(0);
  });
});
