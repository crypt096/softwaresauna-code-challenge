import { Position } from "./position.interface";

export class ASCIIMap {
	private readonly rawMapData: string;
	private readonly mapMatrix: string[][];

	constructor(map: string) {
		this.rawMapData = map;
		this.mapMatrix = this.rawMapData.split('\n').map(string => string.split(''));
	}

	public get MapData(): string {
		return this.rawMapData;
	}

	public get MapMatrix(): string[][] {
		return this.mapMatrix;
	}

	public getCharacterAtPosition(map: ASCIIMap, position: Position): string {
		if (this.isPositionWithinMap(map, position)) {
			return map.mapMatrix[position.y][position.x];
		} else {
			return null;
		}
	}

	public isPositionWithinMap(map: ASCIIMap, position: Position): boolean {
		const arePositionCoordinatesPositive = position.y >= 0 && position.x >= 0;
		const arePositionCoordinatesWithinMap = !!map.mapMatrix[position.y] && !!map.mapMatrix[position.y][position.x];

		return arePositionCoordinatesPositive && arePositionCoordinatesWithinMap;
	}

	public findCharacterPosition(map: ASCIIMap, char: string): Position[] {
		return map.mapMatrix.reduce(
			(acc, row, rowIndex) => {
				const indexOfStartCharacter = row.indexOf(char);
				if (indexOfStartCharacter >= 0) {
					console.log(`Found character ${char} at position ${rowIndex},${indexOfStartCharacter}`);
					acc.push({
						x: indexOfStartCharacter,
						y: rowIndex
					});
				}
				return acc;
			},
			[] as Position[]
	);
	}
}