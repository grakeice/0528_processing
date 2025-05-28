import "../style/index";
import ParticleRenderer from "./ParticleRenderer";

const field = new ParticleRenderer("#field", () => {
	const displayBallCount = document.getElementById("display-ball-count");
	const displayMaxBallCount = document.getElementById("display-max-ball-count");
	const particlesCount = field.particles.length;
	if (displayBallCount) {
		displayBallCount.textContent = particlesCount.toString().padStart(3, "0");
	}
	if (displayMaxBallCount) {
		if (Number(displayMaxBallCount.textContent) < particlesCount) {
			displayMaxBallCount.textContent = particlesCount
				.toString()
				.padStart(3, "0");
		}
	}
});
