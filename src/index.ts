import { Pathfinder } from './pathfinder.class';

const exampleMap = `
   @--A-+
        |
        
        B-x
`;

try {
        const pathfinder = new Pathfinder(exampleMap);
        console.log(`Path: ${pathfinder.PathString}`);
        console.log(`Collected letters: ${pathfinder.UniquePathCharacters}`);
} catch (error) {
        console.log(error);
}