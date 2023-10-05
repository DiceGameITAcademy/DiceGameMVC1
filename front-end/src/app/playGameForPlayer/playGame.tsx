const playerGame = async () => {
    "use server";
    const createGameForPlayer = await fetch("http://localhost:3001/api/game/:id");
    const playerGame = await createGameForPlayer .json();
    return (
      <table>
        <thead>
          <tr>
            <th>Game Id</th>
            <th>Player id</th>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {playerGame.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.player.id}</td>
              <td>{game.player.name}</td>
              <td>{game.score}</td>
              <td>{game.status}</td>


            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default playerGame;
  
  ﻿