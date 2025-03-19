const { Ship, Gameboard, Player, GameController } = require("./battleship");

describe("Ship class", () => {
  test("creates a ship with the correct length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hitCount).toBe(0);
  });

  test("registers hits correctly", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hitCount).toBe(1);
    ship.hit();
    expect(ship.hitCount).toBe(2);
  });

  test("does not allow hits beyond its length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.hit(); // Extra hit
    expect(ship.hitCount).toBe(2); // Shouldn't increase past length
  });

  test("determines if ship is sunk correctly", () => {
    const ship = new Ship(2);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard class", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("initializes an empty 10x10 board", () => {
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
    expect(gameboard.board.flat().every((cell) => cell === null)).toBe(true);
  });

  test("places a ship horizontally", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, true);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
  });

  test("places a ship vertically", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, false);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
  });

  test("prevents overlapping ships", () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    gameboard.placeShip(ship1, 0, 0, true);
    expect(gameboard.placeShip(ship2, 0, 1, true)).toBe(false);
  });

  test("registers a missed attack", () => {
    expect(gameboard.receiveAttack(0, 0)).toBe("miss");
    expect(gameboard.board[0][0]).toBe("miss");
  });

  test("registers a hit on a ship", () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, 0, 0, true);
    expect(gameboard.receiveAttack(0, 0)).toBe("hit");
    expect(ship.hitCount).toBe(1);
  });

  test("registers a sunk ship", () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, 0, 0, true);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    expect(gameboard.receiveAttack(0, 1)).toBe("sunk");
  });

  test("checks if all ships are sunk", () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    gameboard.placeShip(ship1, 0, 0, true);
    gameboard.placeShip(ship2, 1, 0, true);

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    expect(gameboard.allShipsSunk()).toBe(false);

    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(1, 2);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});

describe("Player class", () => {
  let player, aiPlayer, enemyBoard;

  beforeEach(() => {
    player = new Player();
    aiPlayer = new Player(true);
    enemyBoard = new Gameboard();
  });

  test("Player can attack enemy board", () => {
    const result = player.attack(enemyBoard, 0, 0);
    expect(result).toBe("miss");
    expect(enemyBoard.board[0][0]).toBe("miss");
  });

  test("AI generates valid random moves", () => {
    for (let i = 0; i < 100; i++) {
      const [row, col] = aiPlayer.getRandomMove();
      expect(row).toBeGreaterThanOrEqual(0);
      expect(row).toBeLessThan(10);
      expect(col).toBeGreaterThanOrEqual(0);
      expect(col).toBeLessThan(10);
    }
  });

  test("AI does not repeat moves", () => {
    const moves = new Set();
    for (let i = 0; i < 50; i++) {
      const move = aiPlayer.getRandomMove();
      expect(moves.has(move.toString())).toBe(false);
      moves.add(move.toString());
    }
  });

  test("AI attack registers hits and misses", () => {
    const ship = new Ship(2);
    enemyBoard.placeShip(ship, 0, 0, true);

    const move = aiPlayer.aiAttack(enemyBoard);
    const [row, col] = move.coords;

    expect(enemyBoard.board[row][col]).not.toBe(null);
  });
});
