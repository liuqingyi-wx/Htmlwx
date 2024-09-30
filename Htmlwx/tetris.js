document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('tetris');
    const context = canvas.getContext('2d');
    const startButton = document.getElementById('start-button');
    const scoreElement = document.getElementById('score');
    const pauseButton = document.getElementById('pause-button');
    let isPaused = false;

    const BLOCK_SIZE = 20;
    const BOARD_WIDTH = 12;
    const BOARD_HEIGHT = 20;

    let board = createBoard();
    let score = 0;
    let gameLoop;
    let currentPiece;

    const PIECES = [
        [
            [1, 1],
            [1, 1]
        ],
        [
            [0, 1, 0],
            [1, 1, 1]
        ],
        [
            [1, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 1, 1, 1]
        ],
        [
            [1, 0, 0],
            [1, 1, 1]
        ],
        [
            [0, 0, 1],
            [1, 1, 1]
        ]
    ];

    function createBoard() {
        return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));
    }

    function drawBoard() {
        board.forEach((row, y) => {
            row.forEach((value, x) => {
                context.fillStyle = value ? 'cyan' : 'black';
                context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                context.strokeStyle = 'white';
                context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            });
        });
    }

    function createPiece() {
        const piece = PIECES[Math.floor(Math.random() * PIECES.length)];
        return {
            shape: piece,
            position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece[0].length / 2), y: 0 }
        };
    }

    function drawPiece() {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    context.fillStyle = 'red';
                    context.fillRect((currentPiece.position.x + x) * BLOCK_SIZE, (currentPiece.position.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    context.strokeStyle = 'white';
                    context.strokeRect((currentPiece.position.x + x) * BLOCK_SIZE, (currentPiece.position.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            });
        });
    }

    function movePiece(dx, dy) {
        currentPiece.position.x += dx;
        currentPiece.position.y += dy;
        if (hasCollision()) {
            currentPiece.position.x -= dx;
            currentPiece.position.y -= dy;
            if (dy > 0) {
                mergePiece();
                currentPiece = createPiece();
                if (hasCollision()) {
                    gameOver();
                }
            }
        }
    }

    function hasCollision() {
        return currentPiece.shape.some((row, y) => {
            return row.some((value, x) => {
                return (
                    value &&
                    (board[y + currentPiece.position.y] &&
                        board[y + currentPiece.position.y][x + currentPiece.position.x]) !== 0
                );
            });
        });
    }

    function mergePiece() {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    board[y + currentPiece.position.y][x + currentPiece.position.x] = value;
                }
            });
        });
        clearLines();
    }

    function clearLines() {
        let linesCleared = 0;
        board = board.filter(row => {
            if (row.every(cell => cell)) {
                linesCleared++;
                return false;
            }
            return true;
        });
        while (linesCleared > 0) {
            board.unshift(Array(BOARD_WIDTH).fill(0));
            linesCleared--;
        }
        score += linesCleared * 100;
        scoreElement.textContent = `分数: ${score}`;
    }

    function gameOver() {
        clearInterval(gameLoop);
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'white';
        context.font = '20px Arial';
        context.textAlign = 'center';
        context.fillText('游戏结束', canvas.width / 2, canvas.height / 2);
    }

    function update() {
        if (!isPaused) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBoard();
            drawPiece();
            movePiece(0, 1);
        }
    }

    function startGame() {
        board = createBoard();
        score = 0;
        scoreElement.textContent = `分数: ${score}`;
        currentPiece = createPiece();
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(update, 1000 / 2);
        isPaused = false;
        pauseButton.textContent = '暂停';
    }

    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', togglePause);

    document.addEventListener('keydown', event => {
        if (!isPaused) {
            switch (event.keyCode) {
                case 37: // 左箭头
                    movePiece(-1, 0);
                    break;
                case 39: // 右箭头
                    movePiece(1, 0);
                    break;
                case 40: // 下箭头
                    movePiece(0, 1);
                    break;
                case 38: // 上箭头（旋转）
                    rotatePiece();
                    break;
            }
        }
    });

    function rotatePiece() {
        const rotated = currentPiece.shape[0].map((_, index) =>
            currentPiece.shape.map(row => row[index]).reverse()
        );
        const previousShape = currentPiece.shape;
        currentPiece.shape = rotated;
        if (hasCollision()) {
            currentPiece.shape = previousShape;
        }
    }

    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(gameLoop);
            pauseButton.textContent = '继续';
            context.fillStyle = 'rgba(0, 0, 0, 0.5)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'white';
            context.font = '20px Arial';
            context.textAlign = 'center';
            context.fillText('游戏暂停', canvas.width / 2, canvas.height / 2);
        } else {
            gameLoop = setInterval(update, 1000 / 2);
            pauseButton.textContent = '暂停';
        }
    }
});