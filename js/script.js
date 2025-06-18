const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleWidth = 10, paddleHeight = 100;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 7, ballSpeedY = 5;

let puntosJugador = 0;
let puntosIA = 0;

const puntosJugadorDOM = document.getElementById("jugador");
const puntosIADOM = document.getElementById("consola");



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

function resetBall(puntoPara) {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;

  if (puntoPara === "jugador") {
    puntosJugador++;
    puntosJugadorDOM.textContent = puntosJugador;
  } else if (puntoPara === "ia") {
    puntosIA++;
    puntosIADOM.textContent = puntosIA;
  }

  if (puntosJugador === 10) {
    alert("Jugador Gano")
    location.reload()
  } else if (puntosIA === 10) {
    alert("Consola Gano")
    location.reload()
  }
}

function update() {
  // Movimiento pelota
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebote superior/inferior
  if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;

  // Rebote jugador
  if (
    ballX <= 20 &&
    ballY > playerY &&
    ballY < playerY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Rebote IA
  if (
    ballX >= canvas.width - 20 &&
    ballY > aiY &&
    ballY < aiY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Punto IA
  if (ballX <= 0) resetBall("ia");

  // Punto jugador
  if (ballX >= canvas.width) resetBall("jugador");

  // Movimiento IA
  const velocidadIA = 0.1; // más rápido
  const error = (Math.random() - 2) * 10; // movimiento aleatorio
  aiY += (ballY + error - (aiY + paddleHeight / 2)) + velocidadIA;

}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
  drawRect(10, playerY, paddleWidth, paddleHeight, "white");
  drawRect(canvas.width - 20, aiY, paddleWidth, paddleHeight, "white");
  drawCircle(ballX, ballY, 10, "white");
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Controles de teclado
document.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
  playerY = Math.max(0, Math.min(canvas.height - paddleHeight, playerY));
});

gameLoop();
