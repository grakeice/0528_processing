import Matter, { Bodies } from "matter-js";

export interface IParticle {
	x: number;
	y: number;
	diameter: number;
	angle: number;
	color: string;
	body: Matter.Body;
	world: Matter.World;
	updatePosition(): void;
}

export class Circle implements IParticle {
	x: number;
	y: number;
	diameter: number;
	angle: number;
	color: string;
	body: Matter.Body;
	world: Matter.World;
	constructor({
		x,
		y,
		diameter = 10,
		angle = 0,
		color,
		world,
	}: {
		x: number;
		y: number;
		diameter?: number;
		angle?: number;
		color?: string;
		world: Matter.World;
	}) {
		const generateRandomColor = (): string => {
			const letters = "0123456789ABCDEF";
			let color = "#";
			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		};

		this.x = x;
		this.y = y;
		this.diameter = diameter;
		this.angle = angle;
		this.color = color ?? generateRandomColor();
		this.world = world;
		const options = {
			friction: 0,
			restitution: 0.95,
		};
		this.body = Bodies.circle(x, y, diameter / 2, options);
	}

	updatePosition() {
		this.x = this.body.position.x;
		this.y = this.body.position.y;
		this.angle = this.body.angle;
	}
}
