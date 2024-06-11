import { Pathfinder } from './pathfinder.class';

const exampleMap = `
  @-A-+-B-x
`;

try {
        const pathfinder = new Pathfinder(exampleMap);
        console.log(`Letters: ${pathfinder.UniquePathCharacters}`);
        console.log(`Path as characters: ${pathfinder.PathString}`);
} catch (error) {
        console.log(error);
}