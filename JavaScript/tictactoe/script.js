// Get Player 1 and Player 2 ready
// Start Game
// Ask Player 1 for a position
// check if Player 1 wins / Draw
// Ask Player 2 for a position
// check if Player 2 wins / Draw

//=======================================
// GAME LOGIC OBJECT
//=======================================

const startBtn = document.querySelector(".players-name");

const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getGameBoard = () => board;
  const updateGameBoard = function (value, index) {
    board[index] = value;
  };

  return {
    getGameBoard,
    updateGameBoard,
  };
})();

//=======================================
// GAME LOGIC OBJECT
//=======================================

const Game = (function () {
  // Variables and Constans

  const players = [];
  let turn = 0;
  let winner = false;
  let winnerPlayer;

  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  function createPlayer(name, mark) {
    return { name, mark };
  }

  function checkWinner(index, playerMark) {
    winningCombinations.forEach((combination) => {
      if (
        Gameboard.getGameBoard()[combination[0]] == playerMark &&
        Gameboard.getGameBoard()[combination[1]] == playerMark &&
        Gameboard.getGameBoard()[combination[2]] == playerMark
      ) {
        winner = true;
        winnerPlayer = players[index].name;
        return;
      }
    });
  }

  function playTurn() {
    const position = prompt("what position you want to take?");
    // check if position take
    if (Gameboard.getGameBoard()[position]) {
      console.log("already taken");
    } else {
      Gameboard.updateGameBoard(players[turn].mark, position);
      checkWinner(turn, players[turn].mark);
      turn ? (turn = 0) : (turn = 1);
    }
  }

  const Start = function () {
    Board.renderBoard();

    const formData = Object.fromEntries(new FormData(startBtn));
    console.log(formData);
    console.log(startBtn);

    while (Gameboard.getGameBoard().includes("") && winner == false) {
      playTurn();
    }

    if (winner) {
      console.log(`${winnerPlayer} is the winner!!`);
    }

    if (!Gameboard.getGameBoard().includes("")) {
      console.log(`It's a Draw!! Nice try!`);
    }
  };

  return { Start };
})();

//=======================================
// GAME LOGIC OBJECT
//=======================================

const Board = (function () {
  const boardElement = document.querySelector(".gameboard");

  function renderBoard() {
    let gameSquares = "";
    Gameboard.getGameBoard().forEach((slot) => {
      gameSquares += `<div class="square">${slot}</div>`;
    });
    boardElement.innerHTML = gameSquares;
  }

  return { renderBoard };
})();

startBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  Game.Start();
});
