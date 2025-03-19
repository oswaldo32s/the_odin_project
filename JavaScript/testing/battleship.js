class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
  }

  hit() {
    if (this.hitCount < this.length) {
      this.hitCount += 1;
    }
  }

  isSunk() {
    return this.hitCount >= this.length;
  }
}

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = Array.from({ length: size }, () => Array(size).fill(null));
    this.missedShots = [];
    this.ships = [];
  }

  placeShip(ship, row, col, isHorizontal = true) {
    if (!this.isValidPlacement(ship, row, col, isHorizontal)) return false;

    for (let i = 0; i < ship.length; i++) {
      this.board[row][col] = ship;
      isHorizontal ? col++ : row++;
    }

    this.ships.push(ship);
    return true;
  }

  isValidPlacement(ship, row, col, isHorizontal) {
    for (let i = 0; i < ship.length; i++) {
      if (
        row >= this.size ||
        col >= this.size ||
        this.board[row][col] !== null
      ) {
        return false;
      }
      isHorizontal ? col++ : row++;
    }
    return true;
  }

  receiveAttack(row, col) {
    if (this.board[row][col] === null) {
      this.board[row][col] = "miss";
      this.missedShots.push([row, col]);
      return "miss";
    }

    if (this.board[row][col] instanceof Ship) {
      const ship = this.board[row][col];
      ship.hit();
      return ship.isSunk() ? "sunk" : "hit";
    }

    return "already attacked";
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

class Player {
  constructor(isAI = false) {
    this.isAI = isAI;
    this.gameboard = new Gameboard();
    this.previousMoves = new Set(); // To track AI's past moves
  }

  attack(enemyBoard, row, col) {
    return enemyBoard.receiveAttack(row, col);
  }

  getRandomMove() {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (this.previousMoves.has(`${row},${col}`)); // Prevent duplicate moves

    this.previousMoves.add(`${row},${col}`);
    return [row, col];
  }

  aiAttack(enemyBoard) {
    const [row, col] = this.getRandomMove();
    return { result: this.attack(enemyBoard, row, col), coords: [row, col] };
  }
}

class GameController {
  constructor() {
    this.player = new Player(false);
    this.ai = new Player(true);
    this.currentTurn = "player";
    this.init();
  }

  init() {
    // Place ships randomly (or manually later)
    this.setupShips(this.player.gameboard);
    this.setupShips(this.ai.gameboard);

    // Render initial UI
    this.renderBoards();
    this.addEventListeners();
  }

  setupShips(gameboard) {
    const shipSizes = [5, 5, 4, 4, 3, 3, 2, 2]; // Example ship sizes
    shipSizes.forEach((size) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const isHorizontal = Math.random() > 0.5;
        placed = gameboard.placeShip(new Ship(size), row, col, isHorizontal);
      }
    });
  }

  renderBoards() {
    // Render player and AI boards (use UI functions)
    this.renderBoard(this.player.gameboard, "player-board", false);
    this.renderBoard(this.ai.gameboard, "ai-board", true);
  }

  renderBoard(gameboard, elementId, hideShips) {
    const boardElement = document.getElementById(elementId);
    boardElement.innerHTML = ""; // Clear old content

    gameboard.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;

        if (cell === "miss") {
          cellDiv.classList.add("miss");
        } else if (cell === "hit") {
          cellDiv.classList.add("hit");
        } else if (!hideShips && cell instanceof Ship) {
          cellDiv.classList.add("ship");
        }

        boardElement.appendChild(cellDiv);
      });
    });
  }

  addEventListeners() {
    document.getElementById("ai-board").addEventListener("click", (event) => {
      if (this.currentTurn !== "player") return;
      const cell = event.target;
      if (!cell.classList.contains("cell")) return;

      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);

      this.handlePlayerMove(row, col);
    });
  }

  handlePlayerMove(row, col) {
    const result = this.player.attack(this.ai.gameboard, row, col);
    this.renderBoards();

    if (this.checkGameOver()) return;

    this.currentTurn = "ai";
    setTimeout(() => this.handleAIMove(), 1000);
  }

  handleAIMove() {
    const move = this.ai.aiAttack(this.player.gameboard);
    this.renderBoards();

    if (this.checkGameOver()) return;

    this.currentTurn = "player";
  }

  checkGameOver() {
    if (this.ai.gameboard.allShipsSunk()) {
      alert("You win!");
      return true;
    } else if (this.player.gameboard.allShipsSunk()) {
      alert("AI wins!");
      return true;
    }
    return false;
  }
}

export { Ship, Gameboard, Player, GameController };
