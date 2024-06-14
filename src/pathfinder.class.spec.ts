import { Pathfinder } from './pathfinder.class';
import { ASCIIMap } from './asciimap.class';

// Define the test maps
const map1 = `
  @---A---+
          |
  x-B-+   C
      |   |
      +---+
`;

const map2 = `
  @
  | C----+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
`;

const map3 = `
  @---+
      B
K-----|--A
|     |  |
|  +--E  |
|  |     |
+--E--Ex C
   |     |
   +--F--+
`;

// Define invalid test maps
const invalidMaps = [
    { map: `
  @---A---+
          @
  x-B-+   C
      |   |
`, error: 'Invalid map - Multiple start characters found' },
    { map: `
K-----|--A
|     |  |
|  +--E  |
|  |     |
+--E--Ex C
`, error: 'Invalid map - Start character not found' },
    { map: `
   @--A---+
          |
    B-+   C
      |   |
      +---+
`, error: 'Invalid map - End character not found' },
    { map: `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
`, error: 'Invalid map - Fork in path' },
    { map: `
   @--A-+
        |
         
        B-x
`, error: 'Invalid map - Broken path' },
    { map: `
  x-B-@-A-x
`, error: 'Invalid map - Multiple starting paths found' },
    { map: `
  @-A-+-B-x
`, error: 'Invalid map - Fake turn' }
];

describe('Pathfinder class', () => {
    describe('Constructor', () => {
        test('should create map', () => {
            const pathfinder = new Pathfinder(map1);
            expect(pathfinder.Map).toBeTruthy();
            expect(pathfinder.Map).toBeInstanceOf(ASCIIMap);
        });
    });

    describe('Map getter', () => {
        test('should return map class', () => {
            const pathfinder = new Pathfinder(map1);
            expect(pathfinder.Map.MapData).toBe(map1);
        });
    });

    describe('PathString getter', () => {
        test('should return string of characters found on path', () => {
            const pathfinder1 = new Pathfinder(map1);
            const pathForMap1 = '@---A---+|C|+---+|+-B-x';
            expect(pathfinder1.PathString).toBe(pathForMap1);

            const pathfinder2 = new Pathfinder(map2);
            const pathForMap2 = '@|A+---B--+|+----C|-||+---D--+|x';
            expect(pathfinder2.PathString).toBe(pathForMap2);

            const pathfinder3 = new Pathfinder(map3);
            const pathForMap3 = '@---+B||E--+|E|+--F--+|C|||A--|-----K|||+--E--Ex';
            expect(pathfinder3.PathString).toBe(pathForMap3);
        });

        invalidMaps.forEach(({ map, error }) => {
            test(`should throw error if map is invalid: ${error}`, () => {
                const pathfinder = new Pathfinder(map);
                expect(() => pathfinder.PathString).toThrowError(error);
            });
        });
    });

    describe('UniquePathCharacters getter', () => {
			test('should return unique characters found on path', () => {
					const pathfinder1 = new Pathfinder(map1);
					const uniqueCharactersForMap1 = 'ACB';
					expect(pathfinder1.PathString).toBeTruthy();
					expect(pathfinder1.UniquePathCharacters).toBe(uniqueCharactersForMap1);

					const pathfinder2 = new Pathfinder(map2);
					const uniqueCharactersForMap2 = 'ABCD';
					expect(pathfinder2.PathString).toBeTruthy();
					expect(pathfinder2.UniquePathCharacters).toBe(uniqueCharactersForMap2);

					const pathfinder3 = new Pathfinder(map3);
					const uniqueCharactersForMap3 = 'BEEFCAKE';
					expect(pathfinder3.PathString).toBeTruthy();
					expect(pathfinder3.UniquePathCharacters).toBe(uniqueCharactersForMap3);
			});
	});
});