// Description: 

// JavaScript file for the snake game
// Idea and code from: https://www.educative.io/blog/javascript-snake-game-tutorial



const canvas = document.getElementById('gameCanvas');           // Get the canvas element
const ctx = canvas.getContext('2d');                            // Get the 2D context
const startButton = document.getElementById('start-button');    // Get the start button

const gridSize = 20;            // Size of each grid square              
const canvasSize = 400;         // Size of the canvas
canvas.width = canvasSize;      // Set the canvas width
canvas.height = canvasSize;     // Set the canvas height

let snake = [{ x: 160, y: 160 }];       // Snake starting position
let food = { x: 0, y: 0 };              // Food starting position
let dx = gridSize;                      // Snake movement in x direction
let dy = 0;                             // Snake movement in y direction
let score = 0;                          // Game score

// Draw the game
function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);    // Clear the canvas
    drawSnake();                                    // Draw the snake       
    drawFood();                                     // Draw the food
}

// Draw the snake
function drawSnake() {
    snake.forEach(part => {                                 // For each part of the snake
        ctx.fillStyle = 'green';                            // Set the fill color to green
        ctx.fillRect(part.x, part.y, gridSize, gridSize);   // Draw the snake part
        ctx.strokeStyle = 'darkgreen';                      // Set the stroke color to dark green
        ctx.strokeRect(part.x, part.y, gridSize, gridSize); // Draw the snake part border
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';                                  // Set the fill color to red
    ctx.fillRect(food.x, food.y, gridSize, gridSize);       // Draw the food
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };    // Calculate the new head position

    if (head.x === food.x && head.y === food.y) {               // If the snake eats the food
        score += 10;                                            // Increase the score
        generateFood();                                         // Generate new food
    } else {                                                    // If the snake does not eat the food
        snake.pop();                                            // Remove the last part of the snake
    }                                                           //                and 
    snake.unshift(head);                                        // Add the new head to the snake (This makes the snake move forward)
}

// Check if the game is over
function checkGameOver() {
    const head = snake[0];                                                              // Get the snake head

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {     // If the snake hits the wall
        return true;                                                                    // Return true
    }

    for (let i = 1; i < snake.length; i++) {                                            // For each part of the snake
        if (snake[i].x === head.x && snake[i].y === head.y) {                           // If the snake hits itself
            return true;                                                                // Return true
        }
    }

    return false;                                                                       // Otherwise, return false
}

// Function to change the direction of the snake based on key press
function changeDirection(event) {
    const keyPressed = event.keyCode;                                                   // Get the key code of the key pressed
    const goingUp = dy === -gridSize;                                                   // Check if the snake is going up
    const goingDown = dy === gridSize;                                                  // Check if the snake is going down
    const goingRight = dx === gridSize;                                                 // Check if the snake is going right
    const goingLeft = dx === -gridSize;                                                 // Check if the snake is going left

    if (keyPressed === 37 && !goingRight) {         // If the left arrow key is pressed and the snake is not going right
        dx = -gridSize;                             // Set the snake movement in x direction to left
        dy = 0;                                     // Set the snake movement in y direction to 0
    }
    if (keyPressed === 38 && !goingDown) {          // If the up arrow key is pressed and the snake is not going down
        dx = 0;                                     // Set the snake movement in x direction to 0
        dy = -gridSize;                             // Set the snake movement in y direction to up
    }
    if (keyPressed === 39 && !goingLeft) {          // If the right arrow key is pressed and the snake is not going left
        dx = gridSize;                              // Set the snake movement in x direction to right
        dy = 0;                                     // Set the snake movement in y direction to 0
    }
    if (keyPressed === 40 && !goingUp) {            // If the down arrow key is pressed and the snake is not going up
        dx = 0;                                     // Set the snake movement in x direction to 0
        dy = gridSize;                              // Set the snake movement in y direction to down
    }
}

// Game loop function
function gameLoop() {
    if (checkGameOver()) {                          // If the game is over
        alert('Game Over! Score: ' + score);        // Show the game over message
        sendScore(score).then(fetchTopScores);      // Send the score to the server
        startButton.classList.remove('hidden');     // Show the start button
        return;                                     // Exit the function
    }

    // Set a timeout to call the game loop again after 100ms (update snake position and draw the game)
    setTimeout(function() {
        moveSnake();                                // Move the snake
        drawGame();                                 // Draw the game
        gameLoop();                                 // Call the game loop function
    }, 100);
}

// Function to start the game
function startGame() {
    startButton.classList.add('hidden');            // Hide the start button
    snake = [{ x: 160, y: 160 }];                   // Reset the snake to the initial position
    dx = gridSize;                                  // Reset the direction in x
    dy = 0;                                         // Reset the direction in y
    score = 0;                                      // Reset the score
    generateFood();                                 // Generate the food
    gameLoop();                                     // Start the game loop
}

// Function to generate food at a random position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * canvasSize / gridSize) * gridSize,    // Generate a random x position for the food
        y: Math.floor(Math.random() * canvasSize / gridSize) * gridSize     // Generate a random y position for the food
    };

    // Ensure the food does not appear on the snake
    snake.forEach(function isFoodOnSnake(part) {
        if (part.x === food.x && part.y === food.y) {       // If the food is on the snake
            generateFood();                                 // Generate new food
        }
    });
}

// Event listeners
startButton.addEventListener('click', startGame);           // Add event listener to the start button
document.addEventListener('keydown', changeDirection);      // Add event listener to the keydown event
startButton.classList.remove('hidden');                     // Show the start button when you start the game
generateFood();                                             // Generate the initial food