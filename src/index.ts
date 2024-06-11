import { Command } from 'commander';
import * as fs from 'fs';
import { Pathfinder } from './pathfinder.class';

const program = new Command();

program
  .option('-f, --file <path>', 'file path')
  .parse(process.argv);

const options = program.opts();

if (!options.file) {
  console.error('Error: You must specify a file using the -f or --file option.');
  process.exit(1);
}

try {
  const content = fs.readFileSync(options.file, { encoding: 'utf8' });
  const pathfinder = new Pathfinder(content);
  console.log(`Path: ${pathfinder.PathString}`);
  console.log(`Collected letters: ${pathfinder.UniquePathCharacters}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}