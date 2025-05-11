const playButtons = document.querySelectorAll(".play-button");
const gameScreen = document.getElementById("game-screen");
const gameArea = document.getElementById("game-area");
const closeButton = document.getElementById("close-button");
const gameTitle = document.getElementById("game-title");
const gameDisplay = document.getElementById("game-display");

// Hide the game screen initially
gameScreen.style.display = 'none';
gameArea.style.display = 'none';

playButtons.forEach(button => {
  button.addEventListener("click", function () {
    const game = button.getAttribute("data-game");

    // Set the title and content based on selected game
    if (game === "snake") {
      gameTitle.textContent = "Snake";
      gameDisplay.innerHTML = `<iframe src="games/snake.html" width="100%" height="100%" style="border: none;"></iframe>`;
    } else if (game === "2048") {
      gameTitle.textContent = "2048";
      gameDisplay.innerHTML = `<iframe src="games/2048.html" width="100%" height="100%" style="border: none;"></iframe>`;
    } else {
      gameTitle.textContent = "Unknown Game";
      gameDisplay.innerHTML = `<p class="text-white fw-bold">Game not available yet!</p>`;
    }

    // Show game screen and area
    gameScreen.style.display = 'flex';
    gameArea.style.display = 'flex';
  });
});

closeButton.addEventListener("click", function () {
  gameScreen.style.display = 'none';
  gameArea.style.display = 'none';
  gameDisplay.innerHTML = ''; // Clear previous game content
});


