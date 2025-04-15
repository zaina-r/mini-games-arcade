let lastRenderTime = 0;
const SNAKE_SPEED = 3; //records how may times a second the snake moves one position
const snakeBody = [{ x: 11, y: 11 }]; //defines where the snake starts at the beginning of the gmae
const gameBoard = document.getElementById("game-board");
let inputDirection = { x: 0, y: 0 }; //the direction that the snake should move - determined b arrow keys
let lastInputDirection = { x: 0, y: 0 }; //get the values of the last arrow keys that was pressed

function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; //calculate the seconds since the last render (convert to seconds)
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; //if the seconds since the last render was less than the seconds between each snake movement, the loop should be exited

  lastRenderTime = currentTime;

  update();
  draw(gameBoard);
}

window.requestAnimationFrame(main);

function draw(gameBoard) {
  gameBoard.innerHTML = ""; //clars everything else in the game board, so that the snake moves smoothly without leaving a trail
  snakeBody.forEach((segment) => {
    //loops through each 'segment'/array of the snakeBody
    const snakeElement = document.createElement("div"); //creates a div for the snakeElement
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x; //determines the starting x and y position of the snake
    snakeElement.classList.add("snake"); //adds the css class 'snake' to the div element
    gameBoard.appendChild(snakeElement); //adds the div element to the game board so that it appears on the screen
  });
}

window.addEventListener("keydown", (e) => {
  //defines what happens when the keys are pressed
  switch (
    e.key //switch between different keys that might be pressed
  ) {
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break; //if the snake is moving in the y direction already, it cannot move in the complete opposite direction
      inputDirection = { x: 0, y: -1 }; //input direction y=-1 because -1 makes the snake go upwards and vice versa
      break;
    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
  }
});

function update() {
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    //loops through each segement of the snake body except the last piece since that position will be vacant once the segments move one block - hence the -2
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  lastInputDirection = inputDirection;

  //changes the direction of the snakes body depending on the input direction
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
