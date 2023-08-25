const cells = document.querySelectorAll('[data-cell]');
const playAgainButton = document.getElementById('play-again');
const board = document.getElementById('board');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (!gameActive || cell.textContent !== '') {
        return;
    }

    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === player);
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
      // Display a draw message
      board.classList.add('draw');
  } else {
      const winningCombination = winningCombinations.find(combination => {
          return combination.every(index => cells[index].textContent === currentPlayer);
      });

      if (winningCombination) {
          // Highlight the winning cells
          winningCombination.forEach(index => {
              cells[index].classList.add('win');
          });

          // Display a win message
          board.classList.add(currentPlayer === 'X' ? 'x-win' : 'o-win');
      }
  }
}
playAgainButton.addEventListener('click', resetGame);

function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  
  // Remove the win and draw effects
  board.classList.remove('draw', 'x-win', 'o-win');
  cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('win'); // Remove winning cell highlighting
      cell.addEventListener('click', handleClick, { once: true });
  });
}
