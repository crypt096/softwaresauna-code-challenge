import { Pathfinder } from './pathfinder.class';
import { ASCIIMap } from './asciimap.class';

// Define the test maps
const validMaps = [
    {
        map: `
  @---A---+
          |
  x-B-+   C
      |   |
      +---+
`,
        pathString: '@---A---+|C|+---+|+-B-x',
        uniqueCharacters: 'ACB'
    },
    {
        map: `
  @
  | C----+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
`,
        pathString: '@|A+---B--+|+----C|-||+---D--+|x',
        uniqueCharacters: 'ABCD'
    },
    {
        map: `
  @---+
      B
K-----|--A
|     |  |
|  +--E  |
|  |     |
+--E--Ex C
   |     |
   +--F--+
`,
        pathString: '@---+B||E--+|E|+--F--+|C|||A--|-----K|||+--E--Ex',
        uniqueCharacters: 'BEEFCAKE'
    }
];

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
            const pathfinder = new Pathfinder(validMaps[0].map);
            expect(pathfinder.Map).toBeTruthy();
            expect(pathfinder.Map).toBeInstanceOf(ASCIIMap);
        });
    });

    describe('Map getter', () => {
        test('should return map class', () => {
            const pathfinder = new Pathfinder(validMaps[0].map);
            expect(pathfinder.Map.MapData).toBe(validMaps[0].map);
        });
    });

    describe('PathString getter', () => {
        validMaps.forEach(({ map, pathString }, index) => {
            test(`should return string of characters found on path for valid map ${index + 1}`, () => {
                const pathfinder = new Pathfinder(map);
                expect(pathfinder.PathString).toBe(pathString);
            });
        });

        invalidMaps.forEach(({ map, error }, index) => {
            test(`should throw error if map is invalid (${index + 1}): ${error}`, () => {
                const pathfinder = new Pathfinder(map);
                expect(() => pathfinder.PathString).toThrow(error);
            });
        });
    });

    describe('UniquePathCharacters getter', () => {
        validMaps.forEach(({ map, uniqueCharacters }, index) => {
            test(`should return unique characters found on path for valid map ${index + 1}`, () => {
                const pathfinder = new Pathfinder(map);
                expect(pathfinder.PathString).toBeTruthy();
                expect(pathfinder.UniquePathCharacters).toBe(uniqueCharacters);
            });
        });
    });
});
