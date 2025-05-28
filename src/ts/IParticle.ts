import Matter from "matter-js";

export interface IParticle {
	x: number;
	y: number;
	r: number;
	angle: number;
	color: string;
	body: Matter.Body;
	world: Matter.World;
	updatePosition(): void;
}
