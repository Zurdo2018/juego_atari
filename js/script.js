const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleWidth = 10, paddleHeight = 100;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;



function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
}

function update() {
  // Movimiento pelota
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebote superior e inferior
  if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;

  // Rebote jugador
  if (ballX <= 20 && ballY > playerY && ballY < playerY + paddleHeight) {
    ballSpeedX *= -1;
  }

  // Rebote IA
  if (ballX >= canvas.width - 20 && ballY > aiY && ballY < aiY + paddleHeight) {
    ballSpeedX *= -1;
  }

  // Punto
  if (ballX <= 0 || ballX >= canvas.width) resetBall();

  // Movimiento IA simple
  aiY += ((ballY - (aiY + paddleHeight / 2))) * 0.05;
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
  drawRect(10,playerY, paddleWidth, paddleHeight, "white");
  drawRect(canvas.width - 20, aiY, paddleWidth, paddleHeight, "white");
  drawCircle(ballX, ballY, 10, "white");
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Control jugador
document.addEventListener("mousemove", e => {
  let rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
});

gameLoop();
