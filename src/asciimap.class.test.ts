import { ASCIIMap } from './asciimap.class';
import { Position } from './position.interface';

describe('ASCIIMap class', () => {
	describe('Constructor', () => {

		test('should save raw map data', () => {
			const mapData = '---';
			const asciiMap = new ASCIIMap(mapData);
			expect(asciiMap.MapData).toBe(mapData);
		});

		test('should save map data as matrix', () => {
			const mapData = ``;
			const asciiMap = new ASCIIMap(mapData);
			expect(asciiMap.MapMatrix.length).toBe(1);
			expect(asciiMap.MapMatrix[0].length).toBe(0);
		});

		test('should split map data on new line', () => {
			const mapData = `---\n---`;
			const asciiMap = new ASCIIMap(mapData);
			expect(asciiMap.MapMatrix.length).toBe(2);
			expect(asciiMap.MapMatrix[0].length).toBe(3);
		});

	});

  describe('function isPositionWithinMap', () => {

		test('should return true if position within map', () => {
			const mapData = `---\n---`;
			const asciiMap = new ASCIIMap(mapData);
			const testPosition1: Position = {
				x: 0,
				y: 0
			};
			const isPosition1OnMap = asciiMap.isPositionWithinMap(asciiMap, testPosition1);
			expect(isPosition1OnMap).toBe(true);
			const testPosition2: Position = {
				x: 1,
				y: 1
			};
			const isPosition2OnMap = asciiMap.isPositionWithinMap(asciiMap, testPosition2);
			expect(isPosition2OnMap).toBe(true);
		});

		test('should return false if position outside of map', () => {
			const mapData = `---\n---`;
			const asciiMap = new ASCIIMap(mapData);
			const testPosition1: Position = {
				x: 5,
				y: 5
			};
			const isPosition1OnMap = asciiMap.isPositionWithinMap(asciiMap, testPosition1);
			expect(isPosition1OnMap).toBe(false);
			const testPosition2: Position = {
				x: -5,
				y: -5
			};
			const isPosition2OnMap = asciiMap.isPositionWithinMap(asciiMap, testPosition2);
			expect(isPosition2OnMap).toBe(false);
		});

	});
});