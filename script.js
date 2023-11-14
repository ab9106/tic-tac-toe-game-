let currentPlayer = 'X';
let board = Array(9).fill('');
let gameOver = false;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const bgMusic = document.getElementById('bgMusic');

// Create cells and add them to the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => makeMove(cell, i));
    boardElement.appendChild(cell);
}

resetBtn.addEventListener('click', () => {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameOver = false;
    messageElement.textContent = "Player X's turn";
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
    modal.style.display = 'none'; // Hide the modal on reset
});

function makeMove(cell, index) {
    if (gameOver || cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    board[index] = currentPlayer;

    if (checkWin(currentPlayer)) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        showModal(`Player ${currentPlayer} wins!`);
    } else if (board.every(cell => cell !== '')) {
        messageElement.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => condition.every(index => board[index] === player));
}

function showModal(message) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.textContent = message;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
    });
}

document.body.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal');
    if (e.target === modal) {
        modal.style.display = 'none';
        modal.remove();
    }
});


// Play background music when the game starts
bgMusic.play();

resetBtn.addEventListener('click', () => {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameOver = false;
    messageElement.textContent = "Player X's turn";
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
    modal.style.display = 'none'; // Hide the modal on reset

    // Pause the background music when resetting the game
    bgMusic.pause();
});

function makeMove(cell, index) {
    if (gameOver || cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    board[index] = currentPlayer;

    if (checkWin(currentPlayer)) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        showModal(`Player ${currentPlayer} wins!`);

        // Pause the background music when someone wins
        bgMusic.pause();
    } else if (board.every(cell => cell !== '')) {
        messageElement.textContent = "It's a draw!";
        gameOver = true;

        // Pause the background music when it's a draw
        bgMusic.pause();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}
