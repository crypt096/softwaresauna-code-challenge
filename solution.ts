enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

function traverseMap(map: string[][]): { letters: string[], path: string } | string {
  const collectedLetters: string[] = [];
  let path = '';
  let startRow = -1;
  let startCol = -1;

  // Find starting point
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '@') {
        startRow = i;
        startCol = j;
        break;
      }
    }
  }

  if (startRow === -1 || startCol === -1) {
    return 'Error: Missing start character';
  }

  let currentRow = startRow;
  let currentCol = startCol;
  let direction = Direction.RIGHT;

  while (true) {
    const currentChar = map[currentRow][currentCol];

    // Check for end of path
    if (currentChar === 'x') {
      break;
    }

    // Check for valid characters
    if (!isValidCharacter(currentChar)) {
      return 'Error: Invalid character found';
    }

    // Collect letters
    if (isLetter(currentChar)) {
      if (!collectedLetters.includes(currentChar)) {
        collectedLetters.push(currentChar);
      }
    }

    // Update path
    path += currentChar;

    // Move to next position
    switch (direction) {
      case Direction.UP:
        currentRow--;
        break;
      case Direction.DOWN:
        currentRow++;
        break;
      case Direction.LEFT:
        currentCol--;
        break;
      case Direction.RIGHT:
        currentCol++;
        break;
    }

    // Check for intersection
    if (currentChar === '+') {
      direction = getNextDirection(currentRow, currentCol, direction, map);
    }
  }

  return { letters: collectedLetters, path };
}

function isValidCharacter(char: string): boolean {
  return /^[A-Z@x+-]$/.test(char);
}

function isLetter(char: string): boolean {
  return /^[A-Z]$/.test(char);
}

function getNextDirection(row: number, col: number, currentDirection: Direction, map: string[][]): Direction {
  const upChar = row > 0 ? map[row - 1][col] : '';
  const downChar = row < map.length - 1 ? map[row + 1][col] : '';
  const leftChar = col > 0 ? map[row][col - 1] : '';
  const rightChar = col < map[row].length - 1 ? map[row][col + 1] : '';

  switch (currentDirection) {
    case Direction.UP:
    case Direction.DOWN:
      if (leftChar === '-' || isLetter(leftChar)) {
        return Direction.LEFT;
      } else if (rightChar === '-' || isLetter(rightChar)) {
        return Direction.RIGHT;
      }
      break;
    case Direction.LEFT:
    case Direction.RIGHT:
      if (upChar === '|' || isLetter(upChar)) {
        return Direction.UP;
      } else if (downChar === '|' || isLetter(downChar)) {
        return Direction.DOWN;
      }
      break;
  }

  return currentDirection; // If no valid direction found, maintain current direction
}

// Example usage
const exampleMap = [
  ['@', '-', 'A', '-', '-', '+', '|', 'C', '|', ' '],
  [' ', ' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', ' '],
  [' ', 'x', '-', 'B', '-', '+', ' ', ' ', ' ', ' ']
];

const result = traverseMap(exampleMap);
if (typeof result === 'string') {
  console.error(result);
} else {
  console.log('Collected letters:', result.letters.join(''));
  console.log('Path:', result.path);
}