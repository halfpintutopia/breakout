const grid = document.getElementById('grid');
const score = document.getElementById('score');
const numberOfBlocks = 15;
const numberOfColumns = 5;
const boardWidth = 560;
const boardHeight = 300;
const ballWidth = 20;
const blockWidth = 100;
const blockHeight = 20;
const xIncrement = 110;
const yIncrement = 30;
const blocks = [];
const userStart = [230, 10];
const ballStart = [boardWidth / 2 - ballWidth / 2, 40];

let i = 0,
    num = 0,
    currentPosition = userStart,
    ballCurrentPosition = ballStart,
    user, ball, timerID,
    xDirection = 2,
    yDirection = 2,
    currentScore = 0;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

function createBlocks() {
    let xAxis = 10;
    let yAxis = 270;
    while (num < numberOfBlocks) {
        blocks.push(new Block(xAxis, yAxis));
        xAxis += xIncrement;
        num++;

        if (num % numberOfColumns === 0) {
            yAxis -= yIncrement;
            xAxis = 10;
        }
    }
}

function addBlocks() {
    createBlocks();
    while (i < blocks.length) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = `${blocks[i].bottomLeft[0]}px`
        block.style.bottom = `${blocks[i].bottomLeft[1]}px`
        grid.append(block);
        i++;
    }
}

addBlocks();

function createUser() {
    user = document.createElement('div');
    user.classList.add('user');
    drawUser();
    grid.append(user);
}

function drawUser() {
    user.style.left = `${currentPosition[0]}px`;
    user.style.bottom = `${currentPosition[1]}px`;
}

function drawBall() {
    ball.style.left = `${ballCurrentPosition[0]}px`;
    ball.style.bottom = `${ballCurrentPosition[1]}px`;
}

createUser();

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

function createBall() {
    ball = document.createElement('div');
    ball.classList.add('ball');
    drawBall()
    grid.append(ball)
}

createBall()

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

timerID = setInterval(moveBall, 30)

function checkForCollisions() {
    let b = 0;
    while (b < blocks.length) {
        if (
            (ballCurrentPosition[0] > blocks[b].bottomLeft[0] && ballCurrentPosition[0] < blocks[b].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballWidth) > blocks[b].bottomLeft[1] && ballCurrentPosition[1] < blocks[b].topLeft[1])
        ) {
            const allBlocks = document.querySelectorAll('.block');

            allBlocks[b].classList.remove('block');
            blocks.splice(b, 1);
            score.innerHTML = ++currentScore;
            changeDirection();
        }
        b++;
    }

    if (
        ballCurrentPosition[0] >= boardWidth - ballWidth ||
        ballCurrentPosition[1] >= boardHeight - ballWidth ||
        ballCurrentPosition[0] <= 0
    ) {
        changeDirection();
    }

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerID);
        score.innerHTML = `You lose!`;
        document.removeEventListener('keydown', moveUser);
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }

    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }

    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }

    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}