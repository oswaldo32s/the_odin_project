const createElement = function (tag, options = {}) {
  const element = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key == "text") {
      element.textContent = value;
    } else if (key == "html") {
      element.innerHTML = value;
    } else if (key == "class") {
      element.classList.add(...value.split(" "));
    } else if (key == "attribute") {
      Object.entries(value).forEach(([attributeKey, attributeValue]) => {
        element.setAttribute(attributeKey, attributeValue);
      });
    } else if (key == "events") {
      Object.entries(value).forEach(([eventKey, eventValue]) => {
        element.addEventListener(eventKey, eventValue);
      });
    } else if (key == "childElements") {
      value.forEach((childElement) => element.appendChild(childElement));
    }
  });

  return element;
};

// Ship with length, hitCount, isSunk
// hit function and sunk function
// using Class since we'll need more than one

export class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    return this.length <= this.hitCount;
  }
}

// using Class since we'll need more than one
export class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.board = Array.from({ length: size }, () => Array(size).fill(null));
    this.missedShots = new Set();
    this.attacksMade = new Set();
    this.ships = [];
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

  addShip(ship, row, col, isHorizontal = true) {
    if (!this.isValidPlacement(ship, row, col, isHorizontal)) return false;

    for (let i = 0; i < ship.length; i++) {
      this.board[row][col] = ship;
      isHorizontal ? col++ : row++;
    }

    this.ships.push(ship);
    return true;
  }

  receiveAttack(row, col) {
    if (this.board[row][col] === null) {
      this.board[row][col] = "miss";
      this.missedShots.add(`${row}, ${col}`);
      return "miss";
    }

    if (this.attacksMade.has(`${row}, ${col}`)) {
      return "already attacked";
    }

    if (this.board[row][col] instanceof Ship) {
      const ship = this.board[row][col];
      ship.hit();
      this.attacksMade.add(`${row}, ${col}`);
      return ship.isSunk() ? "sunk" : "hit";
    }
    return "invalid";
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

// using Class since we'll need more than one
export class Player {
  constructor(computer = true) {
    this.computer = computer;
    this.gameBoard = new GameBoard();
  }

  attackEnemy(EnemyBoard, row, col) {
    return EnemyBoard.receiveAttack(row, col);
  }
}

export const Game = (function () {
  const TURNS = {
    firstPlayer: "Player 1",
    secondPlayer: "Computer",
  };

  const players = [];
  let turn = TURNS.firstPlayer;

  function StartGame() {
    GameUI.renderPlayerCreation();

    // Create Players first real Player then Computer
    players.push(createPlayer(false));
    players.push(createPlayer());

    GameUI.renderBoard(players[0].gameBoard.board);
    console.log(players);
  }

  function createPlayer(computer = true) {
    return new Player(computer);
  }

  function createPlayerBoard() {}

  return { StartGame };
})();

export const GameUI = (function () {
  const app = document.getElementById("App");

  function renderPlayerCreation() {
    console.log(app);
    app.appendChild(
      createElement("div", {
        childElements: [
          createElement("button", {
            text: "Start Game",
          }),
        ],
      })
    );
    return true;
  }

  function renderBoard(PlayerBoard) {
    const playerBoard = createElement("div", {
      childElements: PlayerBoard.map((row, rowI) =>
        createElement("div", {
          class: "boardRow",
          childElements: row.map((col, colI) => {
            return createElement("div", {
              class: `${rowI}-${colI} square`,
            });
          }),
        })
      ),
    });

    app.appendChild(playerBoard);
  }

  return { renderPlayerCreation, renderBoard };
})();
