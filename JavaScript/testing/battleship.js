// Ship with length, hitCount, isSunk
// hit function and sunk function

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

export class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.board = Array.from({ length: size }, () => Array(size).fill(null));
    this.missedShots = [];
    this.attacksMade = [];
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
    if (!this.isValidPlacement(ship, row, col, isHorizontal)) return;

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
      this.missedShots.push([row, col]);
      return "miss";
    }

    if (
      this.attacksMade.some((arr) =>
        arr.every((val, index) => val === [row, col][index])
      )
    ) {
      return "already attacked";
    }

    if (this.board[row][col] instanceof Ship) {
      const ship = this.board[row][col];
      ship.hit();
      this.attacksMade.push([row, col]);
      return ship.isSunk() ? "sunk" : "hit";
    }
    return "invalid";
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
