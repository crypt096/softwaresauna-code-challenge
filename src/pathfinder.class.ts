import { ASCIIMap } from './asciimap.class';
import { StepFinder } from './stepfinder.class';
import { Step } from './step.interface';

export class Pathfinder {
	private path: Step[];
	private map: ASCIIMap;
	private stepFinder: StepFinder;
	private readonly startCharacter: string = '@';
	private readonly endCharacter: string = 'x';
	private readonly validAlphaCharacterRegExp: RegExp = new RegExp('^(?![xX])[A-Za-z]$');

	constructor(mapString: string) {
		this.map = new ASCIIMap(mapString);
		this.stepFinder = new StepFinder();
	}

	public get Map(): ASCIIMap {
		return this.map;
	}

	private get Path(): Step[] {
		if (!this.path) {
			this.path = this.findPath(this.map);
		}
		return this.path;
	}

	public get PathString(): string {
		return this.Path.map((step: Step) => step.char).join('');
	}

	public get UniquePathCharacters(): string {
		const stepsWithCharacter = this.Path.filter((step: Step) => this.validAlphaCharacterRegExp.test(step.char));
		const directionStringFormat: (step) => string = (step: Step) => `${step.position.x}-${step.position.y}`;
		const uniqueSteps = stepsWithCharacter.reduce(
			(acc, step) => acc.set(directionStringFormat(step), step.char),
			new Map<string, string>()
		);
		return [...uniqueSteps.values()].join('');
	}

	private findPath(map: ASCIIMap): Step[] {
		const startCharacterPosition = map.findCharacterPosition(map, this.startCharacter);
		const endCharacterPosition = map.findCharacterPosition(map, this.endCharacter);
		if (startCharacterPosition.length === 0) {
			throw Error('Invalid map - Start character not found');
		} else if (endCharacterPosition.length === 0) {
			throw Error('Invalid map - End character not found');
		} else if (startCharacterPosition.length > 1) {
			throw Error('Invalid map - Multiple start characters found');
		}

		return this.getNextPath(map, null);
	}

	private getNextPath(map: ASCIIMap, step: Step): Step[] {
		const nextStep = this.stepFinder.getNextStep(map, step);
		if (nextStep) {
			return [nextStep, ...this.getNextPath(map, nextStep)];
		} else {
			return [];
		}
	}
}