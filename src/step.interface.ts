import { Position } from "./position.interface";
import { Direction } from "./direction.enum";

export interface Step {
	position: Position;
	direction: Direction;
	char: string;
}