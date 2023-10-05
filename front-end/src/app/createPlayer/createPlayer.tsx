const createPlayer = async () => {
    "use server";
    const fetchRouteForPlayer = await fetch("http://localhost:3001/api/players");
    const createaPlayer = await fetchRouteForPlayer.json();
    return (
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Password</th>
      
          </tr>
        </thead>
        <tbody>
          {createaPlayer.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.password}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default createPlayer;
  
  ﻿