const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');

const gridSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 160, y: 160 }];
let food = { x: 0, y: 0 };
let dx = gridSize;
let dy = 0;
let score = 0;

function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake();
    drawFood();
}

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(part.x, part.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function checkGameOver() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = dy === -gridSize;
    const goingDown = dy === gridSize;
    const goingRight = dx === gridSize;
    const goingLeft = dx === -gridSize;

    if (keyPressed === 37 && !goingRight) {
        dx = -gridSize;
        dy = 0;
    }
    if (keyPressed === 38 && !goingDown) {
        dx = 0;
        dy = -gridSize;
    }
    if (keyPressed === 39 && !goingLeft) {
        dx = gridSize;
        dy = 0;
    }
    if (keyPressed === 40 && !goingUp) {
        dx = 0;
        dy = gridSize;
    }
}

function gameLoop() {
    if (checkGameOver()) {
        alert('Game Over! Score: ' + score);
        sendScore(score).then(fetchTopScores);
        startButton.classList.remove('hidden');
        return;
    }

    setTimeout(function() {
        moveSnake();
        drawGame();
        gameLoop();
    }, 100);
}

function startGame() {
    startButton.classList.add('hidden');
    snake = [{ x: 160, y: 160 }];
    dx = gridSize;
    dy = 0;
    score = 0;
    generateFood();
    gameLoop();
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * canvasSize / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvasSize / gridSize) * gridSize
    };

    // Ensure the food does not appear on the snake
    snake.forEach(function isFoodOnSnake(part) {
        if (part.x === food.x && part.y === food.y) {
            generateFood();
        }
    });
}

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);
startButton.classList.remove('hidden');
generateFood();