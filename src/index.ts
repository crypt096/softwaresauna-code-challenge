import { Pathfinder } from './pathfinder.class';

const exampleMap = `
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
`;

try {
        const pathfinder = new Pathfinder(exampleMap);
        console.log(`Path: ${pathfinder.PathString}`);
        console.log(`Collected letters: ${pathfinder.UniquePathCharacters}`);
} catch (error) {
        console.log(error);
}