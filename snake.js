let lastRenderTime = 0;
const SNAKE_SPEED = 5; //records how many times a second the snake moves one position
const snakeBody = [{ x: 11, y: 11 }]; //represents each segment's position on the grid
const gameBoard = document.getElementById("game-board");
let inputDirection = { x: 0, y: 0 }; //the direction that the snake should move - determined b arrow keys
let lastInputDirection = { x: 0, y: 0 }; //get the values of the last arrow keys that was pressed
const EXPANSION_RATE = 3; //determines by what value the snake will grow when it eats the food
let newSegments = 0; //how many new segments are waiting to be added to the snake
const GRID_SIZE = 21;
let food = getRandomFoodPosition(); //determines where the food apears in the game board
let gameOver = false;


function main(currentTime) {

    if (gameOver) {
        if (confirm('You Lose! Press OK to restart the game')) {
            window.location .reload(); //reloads the page when the user clicks OK
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; //calculate the seconds since the last render (convert to seconds)
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; //if the seconds since the last render was less than the seconds between each snake movement, the loop should be exited

    lastRenderTime = currentTime; //reset the last rendered time to calculate the difference

    update();
    draw(gameBoard);
}
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
    //defines what happens when the keys are pressed
    switch (
    e.key //switch between different keys that might be pressed
    ) {
        case "ArrowUp":
            if (lastInputDirection.y !== 0) break; //if the snake is moving in the y direction already, it cannot move in the complete - opposite direction - prevents reversing directions directly
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

function expandSnake(amount) {
    newSegments += amount; //increases the count of the number of new segements to be added to the snake
}

function onSnake(position, {ignoreHead = false} = {}) { //checks if an element overlaps the snake - ignore head will determine if we consider overlaps with the head or not
    return snakeBody.some((segment, index) => { // checks if any part of the snake body intersects with the index
        if (ignoreHead && index === 0) return false; // makes sure that the program doesnt consider the head touching the head
        return equalPositions(segment, position); 
    });
}


//checks if two positions overlaps each other
function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}


//function to add a segment of the snake's body to the existing length
function addSegments() {
    for (let i = 0; i < newSegments; i++) { //loops through the number of new segments that needs to be added
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] }); // pushes a new segment of the snake body by creating a duplicate of the last segment of the snake, at the end of the body
    }
    newSegments = 0;
}


function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}


function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1, // math.random returns a random number between 0 and 0.9999999... which should be multiplied by the grid size - will give us a value between 0 andn gridsize-1, therefore +1 to adjust that 
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}


// checks if something is postioned outside the gameboard/grid
function outsideGrid(position) {
    return (
        position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE
    )
}


function getSnakeHead() {
    return snakeBody[0];
}


function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}


function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}


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

    //code to display the food in the game board

    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function update() {

    addSegments();

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        //loops through each segement of the snake body except the last piece since that position will be vacant once the segments move one block - hence the -2
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    lastInputDirection = inputDirection;

    //changes the direction of the snakes body depending on the input direction
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

    //lengthen the snake when it touches food
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }

    checkDeath(); //checks if the snakes meets the condition to end the game
}
