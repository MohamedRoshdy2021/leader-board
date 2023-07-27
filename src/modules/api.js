const baseUrl = "https://us-central1-js-capstone-backend.cloudfunctions.net/api";
let gameId = null;
export let submittedScores = [];

export const createGame = async () => {
  try {
    const response = await fetch(`${baseUrl}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Your Cool New Game" })
    });

    if (!response.ok) {
      throw new Error("Failed to create a new game.");
    }

    const data = await response.json();
    gameId = data.result; // Store the created game's unique identifier
  } catch (error) {
  }
};

export const refreshScores = async () => {
  try {
    if (!gameId) {
      await createGame(); // Attempt to create a new game if ID is not available
    }

    const response = await fetch(`${baseUrl}/games/${gameId}/scores`);
    if (!response.ok) {
      throw new Error("Failed to fetch scores");
    }

    const data = await response.json();
    submittedScores = data.result; 
    // Do not render the scores immediately here
  } catch (error) {
    throw new Error("Error while refreshing scores:", error);
  }
};

export const submitScore = async () => {
  const nameInput = document.getElementById("name");
  const scoreInput = document.getElementById("score");
  const name = nameInput.value.trim(); 
    const score = parseInt(scoreInput.value); 
    
  try {
    if (!gameId) {
      await createGame(); // Attempt to create a new game if ID is not available
    }

    const response = await fetch(`${baseUrl}/games/${gameId}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: name, score }),
    });

    nameInput.value = "";
    scoreInput.value = "";

    // Update the local array with the submitted score
    submittedScores.push({ user: name, score });

  } catch (error) {
    console.error("Error while submitting score:", error);
  }
};
