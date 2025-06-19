    function drawStartScreen() {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.fillStyle = "black";
      ctx.font = "36px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Start The Program", WIDTH / 2, 150);
      ctx.font = "24px Arial";
      ctx.fillText(`All-Time High Score: ${highScore}`, WIDTH / 2, 200);

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


    function movePlayer() {
        let speed = 0.2; // how fast the player moves each frame

        // Move X
        let dx = pvx - playerX;
        if (Math.abs(dx) > speed) {
            playerX += Math.sign(dx) * speed;
        } else {
            playerX = pvx;
        }

        // Move Y
        let dy = pvy - playerY;
        if (Math.abs(dy) > speed) {
            playerY += Math.sign(dy) * speed;
        } else {
            playerY = pvy;
        }
    }


    let dayLength = 5;
    let nightLength = 5;
    let currentCycle = 0;
    let isNight = false;

    // basically the main function
    function drawGameScreen() {
      const now = performance.now() / 1000;
      if (!isNight && (now - currentCycle >= dayLength)) {
        currentCycle = now;
        isNight = !isNight
        console.log(`${isNight} + ${now}`);
      }
      else if (isNight && (now - currentCycle >= nightLength)) {
        currentCycle = now;
        isNight = !isNight
        console.log(`${isNight} + ${now}`);
      }

      movePlayer();

      // update and draw things
      drawWorld();     

      // Draw text for score
      ctx.fillStyle = "pink";
      ctx.font = "32px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`rooms: ${debugNumRooms} | coordinates ${Math.floor(playerX)} | ${Math.floor(playerY)}`, 400, 30);

    }


function drawWorld() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    // Calculate the exact center position once
    const centerX = WIDTH / 2;
    const centerY = HEIGHT / 2;
    
    // Calculate the offset to center the player
    const offsetX = centerX - (playerX + 0.5) * tileSize;
    const offsetY = centerY - (playerY + 0.5) * tileSize;
    
    for (let i = 0; i < worldLength; i++) {
        for (let j = 0; j < worldLength; j++) {
            if (!isNight) {
                if (world[i][j] === 0) ctx.fillStyle = "blue";
                else if (world[i][j] === 1) ctx.fillStyle = "green";
                else if (world[i][j] === 2) ctx.fillStyle = "cyan";
            }
            else {
                if (world[i][j] === 0) ctx.fillStyle = "black";
                else if (world[i][j] === 1) ctx.fillStyle = "blue";
                else if (world[i][j] === 2) ctx.fillStyle = "cyan";
            }
          
            // Draw tiles relative to the calculated offset
            ctx.fillRect(
                i * tileSize + offsetX, 
                j * tileSize + offsetY, 
                tileSize, 
                tileSize
            );
        }
    }

    // Draw player perfectly centered
    ctx.fillStyle = "red";
    ctx.fillRect(
        centerX - tileSize/2, 
        centerY - tileSize/2, 
        tileSize, 
        tileSize
    );
}
    
    