export interface Position {
  x: number;
  y: number;
}

export interface ASCIIMap {
  rawMapData: string;
  mapMatrix: string[][];
}

export const createASCIIMap = (map: string): ASCIIMap => ({
  rawMapData: map,
  mapMatrix: map.split('\n').map(row => row.split(''))
});