const grid = document.querySelector(".grid");
const score = document.querySelector(".score");
const blockWidth = 100;
const blockHeight = 20;

let timeId;

const boardWidth = 560;
const boardHeight = 300;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let currentBall = ballStart;
let ballDiameter = 20;
let xDirection = -4;
let yDirection = 4;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),

  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),

  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

console.log(blocks[0]);

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    grid.appendChild(block);
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
  }
}

addBlocks();

const user = document.createElement("div");
user.classList.add("user");
drawUser();
user.style.left = grid.appendChild(user);

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft": {
      if (currentPosition[0] > 8) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    }
    case "ArrowRight": {
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
    }
  }
}

document.addEventListener("keydown", moveUser);

function drawBall() {
  ball.style.left = currentBall[0] + "px";
  ball.style.bottom = currentBall[1] + "px";
}

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

function moveBall() {
  currentBall[0] += xDirection;
  currentBall[1] += yDirection;
  drawBall();
  checkCollisions();
}

timerId = setInterval(moveBall, 30);

function checkCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      currentBall[0] > blocks[i].bottomLeft[0] &&
      currentBall[0] < blocks[i].bottomRight[0] &&
      currentBall[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      currentBall[1] < blocks[i].topLeft[1]
    ) {
      //   alert("AYO");
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();

      if (blocks.length === 0) {
        score.innerHTML = "You're not a donut anymore";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  if (
    currentBall[0] >= boardWidth - ballDiameter ||
    currentBall[1] >= boardHeight - ballDiameter ||
    currentBall[0] <= 0
  ) {
    changeDirection();
  }

  if (
    currentBall[0] > currentPosition[0] &&
    currentBall[0] < currentPosition[0] + blockWidth &&
    currentBall[1] > currentPosition[1] &&
    currentBall[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  if (currentBall[1] <= 0) {
    score.innerHTML = "You donut";
    document.removeEventListener("keydown", moveUser);
    clearInterval(timerId);
  }
}

function changeDirection() {
  if (xDirection === 4 && yDirection === 4) {
    yDirection = -4;
    return;
  }
  if (xDirection === -4 && yDirection === 4) {
    xDirection = 4;
    return;
  }
  if (xDirection === 4 && yDirection === -4) {
    xDirection = -4;
    return;
  }

  if (xDirection === -4 && yDirection === -4) {
    yDirection = 4;
    return;
  }
}
