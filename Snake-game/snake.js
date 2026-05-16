
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

const box = 20;
const canvasSize = 400;

let snake;
let food;
let direction;
let score;
let game;

function startGame() {
  snake = [
    { x: 9 * box, y: 10 * box }
  ];

  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };

  direction = 'RIGHT';
  score = 0;
  scoreText.textContent = score;

  clearInterval(game);
  game = setInterval(drawGame, 100);
}

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  const key = event.key;

  if (key === 'ArrowLeft' && direction !== 'RIGHT') {
    direction = 'LEFT';
  }
  else if (key === 'ArrowUp' && direction !== 'DOWN') {
    direction = 'UP';
  }
  else if (key === 'ArrowRight' && direction !== 'LEFT') {
    direction = 'RIGHT';
  }
  else if (key === 'ArrowDown' && direction !== 'UP') {
    direction = 'DOWN';
  }
}

function collision(head, snakeArray) {
  for (let i = 0; i < snakeArray.length; i++) {
    if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
      return true;
    }
  }

  return false;
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#22c55e' : '#86efac';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = '#111827';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw Food
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'LEFT') snakeX -= box;
  if (direction === 'UP') snakeY -= box;
  if (direction === 'RIGHT') snakeX += box;
  if (direction === 'DOWN') snakeY += box;

  // Eat Food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreText.textContent = score;

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  }
  else {
    snake.pop();
  }

  const newHead = {
    x: snakeX,
    y: snakeY
  };

  // Game Over
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvasSize ||
    snakeY >= canvasSize ||
    collision(newHead, snake)
  ) {
    clearInterval(game);

    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.fillText('Game Over!', 90, 200);
    return;
  }

  snake.unshift(newHead);
}

restartBtn.addEventListener('click', startGame);

startGame();
