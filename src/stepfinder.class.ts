import { ASCIIMap } from './asciimap.class';
import { Step } from './step.interface';
import { Position } from './position.interface';
import { Direction } from './direction.enum';

export class StepFinder {
	private readonly startCharacter: string = '@';
	private readonly endCharacter: string = 'x';
	private readonly cornerCharacter: string = '+';
	private readonly horizontalDirectionCharacter: string = '-';
	private readonly verticalDirectionCharacter: string = '|';
	private readonly noPathCharacter: string = ' ';

	private findPossibleDirections(map: ASCIIMap, step: Step): Direction[] {
		const characterAtPosition = map.getCharacterAtPosition(map, step.position);
    switch (characterAtPosition) {
        case this.startCharacter:
            return [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];

        case this.horizontalDirectionCharacter:
        case this.verticalDirectionCharacter:
            return [step.direction];

        case this.cornerCharacter:
            return this.turnCorner(step.direction);

        case this.endCharacter:
            return [];

        default:
            return [step.direction, ...this.turnCorner(step.direction)];
    }
	}

	private turnCorner(direction: Direction): Direction[] {
    switch (direction) {
			case Direction.LEFT:
			case Direction.RIGHT:
				return [Direction.UP, Direction.DOWN];

			case Direction.UP:
			case Direction.DOWN:
				return [Direction.LEFT, Direction.RIGHT];
    }
}


	private findNextPositionBasedOnDirection(startPosition: Position, direction: Direction): Position {
		switch (direction) {
			case Direction.LEFT:
				return {
					x: startPosition.x - 1,
					y: startPosition.y
				};

			case Direction.RIGHT:
				return {
					x: startPosition.x + 1,
					y: startPosition.y
				};

			case Direction.UP:
				return {
					x: startPosition.x,
					y: startPosition.y - 1
				};

			case Direction.DOWN:
				return {
					x: startPosition.x,
					y: startPosition.y + 1
				};

			default:
				return startPosition;
		}
	}

	private isValidPosition(map: ASCIIMap, position: Position): boolean {
    const isPositionWithinMap = map.isPositionWithinMap(map, position);
    const isPathCharacter = map.getCharacterAtPosition(map, position) !== this.noPathCharacter;
    return isPositionWithinMap && isPathCharacter;
	}


	private parsePotentialSteps(potentialSteps: Step[], currentDirection: Direction): Step {
		if (potentialSteps && potentialSteps.length === 1) {
			return potentialSteps[0];
		} else if (potentialSteps && potentialSteps.length > 1) {
			const newStep = potentialSteps.filter(step => step.direction === currentDirection);
			return newStep[0];
		} else {
			return null;
		}
	}

	private formatStep(map: ASCIIMap, position: Position, direction: Direction): Step {
		const nextPositionBasedOnDirection = this.findNextPositionBasedOnDirection(position, direction);
		return {
			position: nextPositionBasedOnDirection,
			direction: direction,
			char: map.getCharacterAtPosition(map, nextPositionBasedOnDirection)
		};
	}

	public getNextStep(map: ASCIIMap, currentStep: Step | undefined): Step {
		if (!currentStep) {
			const startCharacterPosition = map.findCharacterPosition(map, this.startCharacter);
			return this.formatStep(map, startCharacterPosition[0], null);
		}

		const potentialSteps = this.findPossibleDirections(map, currentStep)
			.map<Step>((direction: Direction) => this.formatStep(map, currentStep.position, direction))
			.filter((s: Step) => this.isValidPosition(map, s.position));

		return this.parsePotentialSteps(potentialSteps, currentStep.direction);
	}
}