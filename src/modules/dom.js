import {submittedScores, refreshScores, submitScore } from "./api";

document.getElementById("refresh").addEventListener("click", () => {
  const scoresList = document.getElementById("scoresList");
  scoresList.innerHTML = ""; 
  submittedScores.forEach((score , index) => {
    const listItem = document.createElement("li");
      if (index % 2 !== 1 ) {
          listItem.style.backgroundColor = "gray"
      }
       listItem.textContent = `${score.user}:${score.score}`;
          scoresList.appendChild(listItem);
  });

  // Now, fetch the latest data from the API and update the local array
  refreshScores();
});

document.getElementById("submit").addEventListener("click", submitScore);
