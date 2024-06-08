"use strict";
const directions = {
    'up': { x: -1, y: 0 },
    'down': { x: 1, y: 0 },
    'left': { x: 0, y: -1 },
    'right': { x: 0, y: 1 }
};
function findStart(map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '@')
                return { x: i, y: j };
        }
    }
    return null;
}
function findEnd(map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 'x')
                return { x: i, y: j };
        }
    }
    return null;
}
function isValidPosition(map, x, y) {
    var _a;
    return x >= 0 && y >= 0 && x < map.length && y < (((_a = map[x]) === null || _a === void 0 ? void 0 : _a.length) || 0);
}
function isLetter(char) {
    return char >= 'A' && char <= 'Z';
}
function getNextPosition(x, y, direction) {
    const move = directions[direction];
    return { x: x + move.x, y: y + move.y };
}
function findNewDirection(map, x, y, currentDirection) {
    for (const direction in directions) {
        if (direction !== currentDirection) {
            const move = directions[direction];
            const newX = x + move.x;
            const newY = y + move.y;
            if (isValidPosition(map, newX, newY) && map[newX][newY] !== ' ' && map[newX][newY] !== undefined) {
                return direction;
            }
        }
    }
    return null;
}
function traverse(map, start, direction) {
    var _a;
    let x = start.x;
    let y = start.y;
    let currentDirection = direction;
    const path = [];
    const letters = [];
    while (true) {
        if (!isValidPosition(map, x, y))
            throw new Error('Broken path');
        const currentChar = map[x][y];
        path.push(currentChar);
        if (isLetter(currentChar) && !letters.includes(currentChar)) {
            letters.push(currentChar);
        }
        if (currentChar === 'x')
            break;
        const nextPosition = getNextPosition(x, y, currentDirection);
        const nextChar = (_a = map[nextPosition.x]) === null || _a === void 0 ? void 0 : _a[nextPosition.y];
        if (nextChar === undefined || nextChar === ' ') {
            const newDirection = findNewDirection(map, x, y, currentDirection);
            if (!newDirection)
                throw new Error('Broken path');
            currentDirection = newDirection;
        }
        else {
            x = nextPosition.x;
            y = nextPosition.y;
        }
    }
    return {
        letters: letters.join(''),
        path: path.join('')
    };
}
function findPath(map) {
    const start = findStart(map);
    if (!start)
        throw new Error('Missing start character');
    const end = findEnd(map);
    if (!end)
        throw new Error('Missing end character');
    return traverse(map, start, 'right');
}
// Test cases
const maps = [
    {
        map: [
            ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
            [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', 'C'],
            ['x', '-', 'B', '-', '+', ' ', ' ', ' ', '|'],
            [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', '+'],
            [' ', ' ', '+', '-', '-', '-', '-', '-', '+']
        ],
        expectedLetters: 'ACB',
        expectedPath: '@---A---+|C|+---+|+-B-x'
    },
    {
        map: [
            ['@'],
            ['|'],
            ['A'],
            ['+', '-', '-', '-', 'B', '-', '-', '+'],
            ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
            ['+', '-', '-', 'C', '-', '-', '+'],
            [' ', ' ', '|', ' ', ' ', ' ', '|'],
            [' ', ' ', '+', '-', '-', '-', '+'],
            [' ', ' ', ' ', ' ', ' ', ' ', 'x']
        ],
        expectedLetters: 'ABCD',
        expectedPath: '@|A+---B--+|+--C-+|-||+---D--+|x'
    }
];
maps.forEach((test, index) => {
    const result = findPath(test.map);
    console.log(`Test ${index + 1}:`, result);
});
