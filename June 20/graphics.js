function drawStartScreen() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "white";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Start The Program", WIDTH / 2, 150);

    drawButton(buttons.play, "Start Game");
}

function drawGameOverScreen() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "black";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", WIDTH / 2, 120);
    ctx.fillText(`Your Score: ${score}`, WIDTH / 2, 180);

    drawButton(buttons.play, "Play Again");
    drawButton(buttons.menu, "Main Menu");
}

function drawButton(btn, text) {
    ctx.fillStyle = "gray";
    ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, btn.x + btn.width / 2, btn.y + 32);
}

let ball = {
    x : 400,
    y : 300,
    ballSpeed : 5,
    xPositive : true,
    yPositive : false,
    size : 25,
}


// _--------------------------------------------_
// enemy ai how do I impliment it, make it predict wrong?
let thinkingSpeed = .75;
let lastThought = 0;
let targY = 300;

function rRange(small, big) {
    return Math.random() * (big - small) + small;
}

// absolutly busted but out of time
function updatePaddle() {
    const cY = enemyY + Math.floor(paddleY / 2);
    const now = performance.now() / 1000;

    if (now > lastThought + thinkingSpeed) {
        lastThought = now;

        let belowPaddle = ball.y > cY;

        if (ball.yPositive) {
            if (belowPaddle) {
                targY = Math.min(600 - paddleY, Math.max(0, rRange(ball.y - ball.ballSpeed, ball.y + ball.ballSpeed)));
            } else {
                targY = Math.min(600 - paddleY, Math.max(0, rRange(ball.y - paddleY, ball.y + paddleY)));
            }
        } else {
            if (belowPaddle) {
                targY = Math.min(600 - paddleY, Math.max(0, rRange(ball.y - paddleY, ball.y)));
            } else {
                targY = Math.min(600 - paddleY, Math.max(0, rRange(ball.y, ball.y + paddleY)));
            }
        }
    }

    if ( targY - enemyY > paddleY) {
        if (targY > cY) {
            enemyY = Math.min(600 - paddleY, enemyY + moveSpeed);
        } else if (targY < cY) {
            enemyY = Math.max(0, enemyY - moveSpeed);
        }
    }
    
}




function checkCollision(pX, pY) {
    let cX = ball.x + Math.floor(ball.size / 2), cY = ball.y + Math.floor(ball.size / 2);
    return (cX < pX + paddleX && cX > pX && cY < pY + paddleY && cY > pY)
}

function updateBall() {
    let reset = false;
    let collision = false;

    

    if (checkCollision(playerX, playerY) || checkCollision(enemyX, enemyY)) collision = true;

    if (!collision) {
        if (ball.xPositive) {
            ball.x += ball.ballSpeed;
            if (ball.x > 800 - ball.size) {
                score += 1;
                reset = true;
            }
        }
        else  {
            ball.x -= ball.ballSpeed;
            if (ball.x < 0) {
                score -= 1;
                reset = true;
            }
        }
    } 
    else {
        
        ball.xPositive = !ball.xPositive;
        if (ball.x < 400) {
            ball.x += paddleX
        }
        else {
            ball.x -= paddleX
        }
    }

    

    if (ball.yPositive) {
        ball.y += ball.ballSpeed;
        if (ball.y > 600 - ball.size) {
            ball.yPositive = !ball.yPositive;
        }
    }
    else  {
        ball.y -= ball.ballSpeed;
        if (ball.y < 0) {
            ball.yPositive = !ball.yPositive;
        }
    }

    if (reset) {
        ball.x = Math.floor(800 / 2);
        ball.y = 300;
        ball.xPositive = Math.random() < 0.5;
        ball.yPositive = Math.random() < 0.5;
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
}


// basically the main function
function drawGameScreen() {
    const now = performance.now() / 1000;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    updatePaddle();
    updateBall();

    drawPaddle(playerX, playerY);
    drawPaddle(enemyX, enemyY);

    ctx.fillStyle = "00ff00";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${score}`, Math.floor(WIDTH / 2), 50);
}


function drawPaddle(x, y) {
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(x, y, paddleX, paddleY);
}
    
    