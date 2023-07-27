const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
let gameId = null;
export const submittedScores = [];
export const createGame = async () => {
  try {
    const response = await fetch(`${baseUrl}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Your Cool New Game' }),
    });

    if (!response.ok) {
      throw new Error('Failed to create a new game.');
    }

    const data = await response.json();
    gameId = data.result; // Store the created game's unique identifier
  } catch (error) {
    throw new Error('thats error');
  }
};

export const refreshScores = async () => {
  try {
    if (!gameId) {
      await createGame();
    }

    const response = await fetch(`${baseUrl}/games/${gameId}/scores`);
    if (!response.ok) {
      throw new Error('Failed to fetch scores');
    }
  } catch (error) {
    throw new Error('Error while refreshing scores:', error);
  }
};

export const submitScore = async () => {
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value, 10);
  try {
    if (!gameId) {
      await createGame();
      if (!gameId) {
        return;
      }
    }
    const response = await fetch(`${baseUrl}/games/${gameId}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: name, score }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit score.');
    }
    nameInput.value = '';
    scoreInput.value = '';

    submittedScores.push({ user: name, score });

    // You can choose to display a success message here if you want
  } catch (error) {
    console.error('Error while submitting score:', error);
  }
};