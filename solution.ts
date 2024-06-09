type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface Position {
  row: number;
  col: number;
}

const directions: { [key in Direction]: Position } = {
  UP: { row: -1, col: 0 },
  DOWN: { row: 1, col: 0 },
  LEFT: { row: 0, col: -1 },
  RIGHT: { row: 0, col: 1 },
};