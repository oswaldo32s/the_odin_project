function knightMoves(start, end) {
  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  function isValidMove(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  const queue = [[start, [start]]]; // [posición actual, camino recorrido]
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    let [current, path] = queue.shift();
    let [x, y] = current;

    if (x === end[0] && y === end[1]) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((pos) => console.log(pos));
      return path;
    }

    for (let [dx, dy] of directions) {
      let newX = x + dx;
      let newY = y + dy;
      let newPos = [newX, newY];

      if (isValidMove(newX, newY) && !visited.has(newPos.toString())) {
        queue.push([newPos, [...path, newPos]]);
        visited.add(newPos.toString());
      }
    }
  }
}

// EJEMPLOS
knightMoves([0, 0], [1, 2]);
// Output:
// You made it in 1 moves! Here's your path:
// [0,0]
// [1,2]

knightMoves([0, 0], [3, 3]);
// Output:
// You made it in 2 moves! Here's your path:
// [0,0]
// [2,1]
// [3,3]

knightMoves([0, 0], [7, 7]);
// Output:
// You made it in 6 moves! Here's your path:
// [0,0]
// [2,1]
// [4,2]
// [6,3]
// [7,5]
// [5,6]
// [7,7]
