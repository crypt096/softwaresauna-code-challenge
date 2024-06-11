import { ASCIIMap } from './asciimap.class';

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

});