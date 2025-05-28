import p5 from "p5";
import { Circle } from "./Particle";
import { Bodies, World, Engine, Runner } from "matter-js";
import { IParticle } from "./IParticle";

export default class ParticleRenderer {
	particles: IParticle[];
	constructor(target?: p5.Element | string | object) {
		this.particles = [];
		const sketch = (p: p5) => {
			const engine = Engine.create();
			const world = engine.world;
			p.setup = () => {
				const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
				if (target) {
					canvas.parent(target);
				}
				Runner.run(engine);
				const ground = Bodies.rectangle(
					p.windowWidth / 2,
					p.windowHeight,
					p.windowWidth,
					10,
					{
						friction: 0,
						restitution: 0.95,
						isStatic: true,
					}
				);
				World.add(world, ground);
			};
			p.draw = () => {
				const displayBallCount = document.getElementById("display-ball-count");
				if (displayBallCount) {
					displayBallCount.textContent = this.particles.length.toString();
				}
				p.background(255);
				Engine.update(engine);
				if (p.mouseIsPressed) {
					const particle = new Circle({
						x: p.mouseX,
						y: p.mouseY,
						r: p.random(5, 20),
						world,
					});
					this.particles.push(particle);
					World.add(world, particle.body);
				}
				for (const particle of this.particles) {
					particle.updatePosition();
					this.draw(p, particle);
				}
			};
		};
		new p5(sketch);
	}
	private draw(p: p5, particle: IParticle) {
		p.circle(particle.x, particle.y, particle.r);
	}
}
