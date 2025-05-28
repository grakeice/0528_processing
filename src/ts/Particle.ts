import Matter, { Bodies } from "matter-js";
import { IParticle } from "./IParticle";

export class Circle implements IParticle {
	x: number;
	y: number;
	r: number;
	angle: number;
	color: string;
	body: Matter.Body;
	world: Matter.World;
	constructor({
		x,
		y,
		r = 10,
		color,
		world,
		angle = 0,
	}: {
		x: number;
		y: number;
		world: Matter.World;
		r?: number;
		color?: string;
		angle?: number;
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
		this.r = r;
		this.angle = angle;
		this.world = world;
		this.color = color ?? generateRandomColor();
		let options = {
			friction: 0,
			restitution: 0.95,
		};
		this.body = Bodies.circle(x, y, r / 2, options);
	}

	updatePosition() {
		this.x = this.body.position.x;
		this.y = this.body.position.y;
		this.angle = this.body.angle;
	}
}
