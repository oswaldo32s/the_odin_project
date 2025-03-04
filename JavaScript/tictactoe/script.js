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
const dialog = document.querySelector(".dialog");
const scoreElement = document.querySelector(".score");

const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getGameBoard = () => board;
  const updateGameBoard = function (value, index) {
    board[index] = value;
  };

  const restartBoard = function () {
    board.forEach((value, index) => {
      updateGameBoard("", index);
    });
  };

  return {
    getGameBoard,
    updateGameBoard,
    restartBoard,
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

  const getPlayers = () => players;

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
    let score = 0;
    function increaseScore() {
      score++;
    }
    const getScore = () => score;
    const resetScore = () => (score = 0);
    return { name, mark, getScore, increaseScore };
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
        if (winner) {
          players[index].increaseScore();
          turn = 1;
          Gameboard.restartBoard();
        }
      }
      if (!Gameboard.getGameBoard().includes("")) {
        turn = 1;
        Gameboard.restartBoard();
      }
    });
  }

  function playTurn(e) {
    const position = e.target.classList[1];
    // check if position take
    if (Gameboard.getGameBoard()[position]) {
    } else {
      Gameboard.updateGameBoard(players[turn].mark, position);
      checkWinner(turn, players[turn].mark);
      turn ? (turn = 0) : (turn = 1);
    }
    Board.renderBoard();
  }

  const Start = function () {
    const formData = Object.fromEntries(new FormData(startBtn));
    players.push(createPlayer(formData.player1, formData.player1Mark));
    players.push(createPlayer(formData.player2, formData.player2Mark));
    Board.renderBoard();
  };

  return { Start, playTurn, getPlayers };
})();

//=======================================
// GAME LOGIC OBJECT
//=======================================

const Board = (function () {
  const boardElement = document.querySelector(".gameboard");

  function renderScore() {
    scoreElement.innerHTML = `
    <span class="player-name">${Game.getPlayers()[0].name} ${
      Game.getPlayers()[0].mark
    }</span>
    <span class="player-score">${Game.getPlayers()[0].getScore()}</span>
    <span class="player-name">${Game.getPlayers()[1].name} ${
      Game.getPlayers()[1].mark
    }</span>
    <span class="player-score">${Game.getPlayers()[1].getScore()}</span>`;
  }

  function renderBoard() {
    if (Game.getPlayers().length != 0) {
      renderScore();
    }
    boardElement.innerHTML = "";
    Gameboard.getGameBoard().forEach((slot, index) => {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add(index);
      square.textContent = slot;
      square.addEventListener("click", Game.playTurn);
      boardElement.appendChild(square);
    });
  }

  return { renderBoard };
})();

startBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  dialog.close();
  Game.Start();
});

dialog.showModal();
Board.renderBoard();
