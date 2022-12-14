const KNIGHT_OFFSETS = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [-1, 2],
  [1, -2],
  [-1, -2],
];

const createSquare = (coordinates, previous) => {
  return {
    coordinates: [...coordinates],
    previous,
  };
};

const getMoves = ([x, y]) => {
  return KNIGHT_OFFSETS.map(([offsetX, offsetY]) => {
    return [offsetX + x, offsetY + y];
    // Filter for moves that are in bounds
  }).filter(([newX, newY]) => {
    return 0 <= newX && newX < 8 && 0 <= newY && newY < 8;
  });
};

const knightMoves = (start, target, queue = []) => {
  queue.push(createSquare(start, null));
  const checkSquare = (square, target) => {
    //Base case, found ending vertex of path
    if (
      square.coordinates[0] == target[0] &&
      square.coordinates[1] == target[1]
    ) {
      return outputPath(square);
    } else {
      enqueueChildren(square);
      //Dequeue
      return checkSquare(queue.shift(), target);
    }
  };

  const enqueueChildren = (square) => {
    const moves = getMoves(square.coordinates);
    moves.forEach((move) => {
      const nextMove = createSquare(move, square);
      queue.push(nextMove);
    });
  };

  //Walk back through the path adding the coordinates of each vertex to an array
  const outputPath = (square, path = []) => {
    path.unshift(square.coordinates);
    // Base case, reached the starting square
    if (!square.previous) {
      return path;
    } else {
      // Recursive step: add the previous square to the path array
      return outputPath(square.previous, path);
    }
  };

  const shortestPath = checkSquare(queue.shift(), target);
  console.log(`You made it in ${shortestPath.length} moves!`);
  console.log("Here is your path:");
  shortestPath.map((coords) => {
    console.log(coords);
  });
};
