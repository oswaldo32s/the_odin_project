import { Ship, GameBoard, Player } from "./battleship";

describe("Test Ship", () => {
  test("Ship has a length of 3", () => {
    const ship = new Ship(3);

    expect(ship.length).toBe(3);
  });

  test("Test hit Ship", () => {
    const ship = new Ship(3);

    ship.hit();

    expect(ship.hitCount).toBe(1);
  });

  test("test sink Ship", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});

describe("Test GameBoard", () => {
  test("test adding ship", () => {
    const board = new GameBoard();

    expect(board.addShip(new Ship(3), 0, 0)).toBe(true);
  });

  test("add a ship that crosses another ship", () => {
    const board = new GameBoard();

    board.addShip(new Ship(4), 0, 0);
    expect(board.addShip(new Ship(3), 0, 2)).toBe(false);
  });

  test("attack a ship and received 'hit', sink a ship and receive 'sunk'", () => {
    const board = new GameBoard();
    board.addShip(new Ship(3), 0, 0);
    expect(board.receiveAttack(0, 1)).toBe("hit");
    board.receiveAttack(0, 0);
    expect(board.receiveAttack(0, 2)).toBe("sunk");
  });

  test('attack ship more than twice and expect "already attacked"', () => {
    const board = new GameBoard();
    board.addShip(new Ship(3), 0, 0);
    board.receiveAttack(0, 1);
    expect(board.receiveAttack(0, 1)).toBe("already attacked");
    expect(board.receiveAttack(0, 1)).toBe("already attacked");
  });

  test("check if ship is sunk vertically and horizontally", () => {
    const board = new GameBoard();
    board.addShip(new Ship(3), 0, 0);
    board.receiveAttack(0, 0);
    board.receiveAttack(0, 1);
    board.receiveAttack(0, 2);
    expect(board.allShipsSunk()).toBe(true);

    board.addShip(new Ship(2), 1, 0, false);
    board.receiveAttack(1, 0);
    board.receiveAttack(2, 0);
    expect(board.allShipsSunk()).toBe(true);
  });
});

describe("Test Player class", () => {
  test("Create computer Player", () => {
    const computerPlayer = new Player();
    expect(computerPlayer.computer).toBe(true);
  });
  test("Create real Player", () => {
    const realPlayer = new Player(false);
    expect(realPlayer.computer).toBe(false);
  });

  test("Attack enemy board and hit", () => {
    const computerPlayer = new Player();
    const realPlayer = new Player(false);

    computerPlayer.board.addShip(new Ship(3), 0, 0);
    realPlayer.board.addShip(new Ship(4), 0, 0, false);

    expect(realPlayer.attackEnemy(computerPlayer.board, 0, 0)).toBe("hit");
    expect(computerPlayer.attackEnemy(realPlayer.board, 1, 0)).toBe("hit");
  });

  test("Attack enemy board and miss", () => {
    const computerPlayer = new Player();
    const realPlayer = new Player(false);

    computerPlayer.board.addShip(new Ship(3), 0, 0);
    realPlayer.board.addShip(new Ship(4), 0, 0, false);

    expect(realPlayer.attackEnemy(computerPlayer.board, 3, 2)).toBe("miss");
    expect(computerPlayer.attackEnemy(realPlayer.board, 4, 9)).toBe("miss");
  });
});
