function placePlayer() {
    const worldLength = world.length;
    const half = Math.floor(worldLength / 2);
    const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1]  // Only check 4 directions (no diagonals)
    ];

    const visited = Array.from({ length: worldLength }, () => Array(worldLength).fill(false));
    const queue = [];

    // Start from center and all room centers
    queue.push([half, half]);
    visited[half][half] = true;

    // Also try random positions if BFS fails
    let randomAttempts = 0;
    const maxRandomAttempts = 100;

    while (queue.length > 0 || randomAttempts < maxRandomAttempts) {
        let x, y;
        
        if (queue.length > 0) {
            [x, y] = queue.shift();
        } else {
            // Fallback to random search if BFS fails
            x = Math.floor(Math.random() * worldLength);
            y = Math.floor(Math.random() * worldLength);
            randomAttempts++;
            if (visited[x][y]) continue;
            visited[x][y] = true;
        }

        if (world[x][y] === 1) {
            playerX = x;
            playerY = y;
            pvx = playerX;
            pvy = playerY;
            return;
        }

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 && ny >= 0 &&
                nx < worldLength && ny < worldLength &&
                !visited[nx][ny]
            ) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
            }
        }
    }

    console.log("failed to find a spot")

    // If absolutely no spot found (unlikely), use center
    playerX = half;
    playerY = half;
}



function createWorld() {
    let half = Math.floor(worldLength / 2);
    let SFC = 10; // space from center 

    function createRoom(x, y, rL, rW) {
        for (let i=x; i<rL+x; i++) {
            for (let j=y; j<rW+y; j++) {
                if (i < 0 || j < 0 || i > worldLength-1 || j > worldLength-1) {
                    continue;
                }
                world[i][j] = (Math.floor(Math.random() * 50) === 0) ? 2 : 1; // 1 in 50 chance of having an item on it.
            }
        }
    }

    numRooms = Math.floor(Math.random() * 5) + 1;
    quadrants = [1, 2, 3, 4, 5];

    debugNumRooms = numRooms

    for (let room = 0; room < numRooms; room++) {
    let quadIndex = Math.floor(Math.random() * quadrants.length);
    let q = quadrants.splice(quadIndex, 1)[0];

    let x = half, y = half;
    if (q !== 5) {
        function rP(end, space) { 
            return Math.floor(Math.random() * (end - 2*space)) + space;
        }
        let offX = rP(half, SFC);
        let offY = rP(half, SFC); 

        if (q === 1) { x += offX; y -= offY; }
        if (q === 2) { x -= offX; y -= offY; }
        if (q === 3) { x -= offX; y += offY; }
        if (q === 4) { x += offX; y += offY; }

        let rL = Math.floor(Math.random() * (maxRoomLength - minRoomLength + 1)) + minRoomLength;
        let rW = Math.floor(Math.random() * (maxRoomLength - minRoomLength + 1)) + minRoomLength;
        createRoom(x, y, rL, rW);
    }
    else {
        // The center cave
        let rL = Math.floor(Math.random() * (maxRoomLength - minRoomLength + 1)) + minRoomLength;
        let rW = Math.floor(Math.random() * (maxRoomLength - minRoomLength + 1)) + minRoomLength;
        x -= Math.floor(rL / 2), y -= Math.floor(rW / 2);
        createRoom(x, y, rL, rW);
    }
    }

    // Once world created, figure out where to put them.
    placePlayer()
}