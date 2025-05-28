import p5 from "p5";
import { IParticle, Circle } from "./Particle";
import { Bodies, World, Engine, Runner } from "matter-js";

export default class ParticleRenderer {
	particles: Set<IParticle>;
	constructor(target?: p5.Element | string | object, onDraw?: Function) {
		this.particles = new Set();
		const sketch = (p: p5) => {
			const engine = Engine.create();
			const world = engine.world;
			p.setup = () => {
				const canvas = p.createCanvas(500, 500);
				if (target) {
					canvas.parent(target);
				}
				Runner.run(engine);
				const ground = Bodies.rectangle(p.width / 2, p.height, p.width, 10, {
					friction: 0,
					restitution: 0.95,
					isStatic: true,
				});
				World.add(world, ground);
			};
			p.draw = () => {
				if (onDraw) onDraw();
				p.background(255);
				Engine.update(engine);
				if (p.mouseIsPressed) {
					const particle = new Circle({
						x: p.mouseX,
						y: p.mouseY,
						diameter: p.random(5, 20),
						world,
					});
					this.particles.add(particle);
					World.add(world, particle.body);
				}
				for (const particle of this.particles) {
					particle.updatePosition();
					const isOnField =
						0 <= particle.x + particle.diameter &&
						particle.x - particle.diameter <= p.width &&
						0 <= particle.y + particle.diameter &&
						particle.y - particle.diameter <= p.height;
					if (isOnField) {
						this.draw(p, particle);
					} else {
						World.remove(world, particle.body);
						this.particles.delete(particle);
					}
				}
			};
		};
		new p5(sketch);
	}
	private draw(p: p5, particle: IParticle) {
		p.push();
		p.fill(particle.color);
		p.noStroke();
		p.circle(particle.x, particle.y, particle.diameter);
		p.pop();
	}
}
