const playButton = document.querySelectorAll(".play-button");
const gameScreen = document.getElementById("game-screen");
const closeButton = document.getElementById("close-button");

gameScreen.style.display = 'none';

playButton.forEach(button => {
  button.addEventListener("click", function () {
    gameScreen.style.display = 'block';
  });
});

closeButton.addEventListener("click", function () {
  gameScreen.style.display = 'none';
});

