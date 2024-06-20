// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false; // Set to false initially
let player1Name = 'Player 1';
let player2Name = 'Player 2';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status-message');
const playerNameInputs = document.getElementById('player-name-inputs');
const gameBoardElement = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const startGameButton = document.getElementById('start-game-button');

// Function to start a new game
function startGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Get player names from input fields or use defaults
    player1Name = document.getElementById('player1-name').value || 'Player 1';
    player2Name = document.getElementById('player2-name').value || 'Player 2';

    // Update status message
    statusDisplay.textContent = `${player1Name}'s turn`;

    // Clear board
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#f0f0f0';
    });

    // Hide player name input fields and show game board and status message
    playerNameInputs.classList.add('hidden');
    gameBoardElement.classList.remove('hidden');
    statusDisplay.classList.remove('hidden');
    resetButton.classList.remove('hidden');
}

// Event listeners for cell clicks
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', showPlayerNameInputs);
startGameButton.addEventListener('click', startGame);

// Function to handle cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Function to handle marking a cell
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Add some visual feedback
    clickedCell.style.backgroundColor = currentPlayer === 'X' ? '#2196F3' : '#FFC107';
}

// Function to handle result validation (win or draw)
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} wins!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    // Switch turns
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}'s turn`;
}

// Function to show player name input fields
function showPlayerNameInputs() {
    playerNameInputs.classList.remove('hidden');
    gameBoardElement.classList.add('hidden');
    statusDisplay.classList.add('hidden');
    resetButton.classList.add('hidden');
}

// Call showPlayerNameInputs initially to prompt for player names
showPlayerNameInputs();
