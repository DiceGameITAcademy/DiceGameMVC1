
async function playGameForPlayer() {
  const playerIdInput = document.getElementById("id");
  const playerId = parseInt(playerIdInput.value);

  if (isNaN(playerId)) {
    console.error("Invalid player ID");
    return;
  }

  try {
    const response = await fetch(`/api/game/${playerId}`, {
      method: "POST",
    });

    if (response.ok) {
      const result = await response.json();
      // Display the entire response object in JSON format
      const responseDiv = document.getElementById("response");
      responseDiv.innerHTML = `<pre>${JSON.stringify(
        result,
        null,
        2
      )}</pre>`;
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData.error);
      // Display the error message in the response div
      const responseDiv = document.getElementById("response");
      responseDiv.innerHTML = `<p>Error: ${errorData.error}</p>`;
    }
  } catch (error) {
    console.error("Error:", error);
    // Display the error message in the response div
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
