import "../style/index";
import ParticleRenderer from "./ParticleRenderer";

const displayBallCount = document.getElementById("display-ball-count");
const displayMaxBallCount = document.getElementById("display-max-ball-count");

const field = new ParticleRenderer(500, 500, "#field");
window.addEventListener("canvas-updated", (e) => {
	const particlesCount = e.detail.particles.size;
	if (displayBallCount) {
		displayBallCount.textContent = particlesCount.toString().padStart(3, "0");
	}
	if (displayMaxBallCount) {
		if (Number(displayMaxBallCount?.textContent ?? 0) < particlesCount) {
			displayMaxBallCount.textContent = particlesCount
				.toString()
				.padStart(3, "0");
		}
	}
});
