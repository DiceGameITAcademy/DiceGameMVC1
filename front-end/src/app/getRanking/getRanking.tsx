const getRanking = async () => {
    "use server";
    const fetchRouteForRanking = await fetch("http://localhost:3001/api/ranking/winner");
    const displayRanking = await fetchRouteForRanking.json();
    return (
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Games played</th>
            <th>Succes Rate</th>
      
          </tr>
        </thead>
        <tbody>
          {displayRanking.map((ranking) => (
            <tr key={ranking.id}>
              <td>{ranking.player.name}</td>
              <td>{ranking.player.gamesPlayed}</td>
              <td>{ranking.player.succesRate}</td>

            
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default getRanking;
  
  ﻿