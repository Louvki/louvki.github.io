<script lang="ts">
	import { onMount, onDestroy } from "svelte";

	// Property offsets for Float32Array (8 properties per dot)
	const X = 0;
	const Y = 1;
	const VX = 2;
	const VY = 3;
	const ORIGIN_X = 4;
	const ORIGIN_Y = 5;
	const RANDOM_ANGLE = 6;
	const RANDOM_SPEED = 7;
	const STRIDE = 8;

	const SPACING = 5;
	const MAX_DIST = 40;

	const RETURN_FORCE_FACTOR = 0.01;
	const MOUSE_FORCE_FACTOR = 0.2;
	const VELOCITY_DAMP = 0.9;

	const VORTEX_STRENGTH = 0.001;
	const VORTEX_RADIUS_FACTOR = 0.0009;

	const ENABLE_RANDOM_MOVEMENT = false;
	const RANDOM_MOVEMENT_SPEED = 0.2;
	const RANDOM_MOVEMENT_CHANGE_RATE = 0.02;

	let USE_IMAGE_DATA = false;

	let canvas: HTMLCanvasElement;
	let dotsData: Float32Array;
	let numDots: number = 0;
	let animationFrameId: number;
	let ctx: CanvasRenderingContext2D;

	const mouseRef = { x: 0, y: 0, active: false };
	const vortexCenterRef = { x: 0, y: 0 };

	function initializeDots(width: number, height: number): void {
		const tempDots: number[] = [];
		for (let x = 0; x < width; x += SPACING) {
			for (let y = 0; y < height; y += SPACING) {
				tempDots.push(
					x, // X
					y, // Y
					0, // VX
					0, // VY
					x, // ORIGIN_X
					y, // ORIGIN_Y
					Math.random() * Math.PI * 2, // RANDOM_ANGLE
					Math.random() * RANDOM_MOVEMENT_SPEED, // RANDOM_SPEED
				);
			}
		}
		numDots = tempDots.length / STRIDE;
		USE_IMAGE_DATA = numDots > 70000;
		dotsData = new Float32Array(tempDots);
	}

	function handleMove(e: MouseEvent | TouchEvent) {
		let x, y;

		if ("touches" in e) {
			x = e.touches[0].clientX;
			y = e.touches[0].clientY;
		} else {
			x = e.clientX;
			y = e.clientY;
		}

		mouseRef.x = x;
		mouseRef.y = y;
		mouseRef.active = true;
	}

	function handleResize() {
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		vortexCenterRef.x = canvas.width / 2;
		vortexCenterRef.y = canvas.height / 2;

		initializeDots(canvas.width, canvas.height);
	}

	function animate() {
		if (!canvas || !ctx) return;

		// Update dots
		for (let i = 0; i < numDots; i++) {
			const idx = i * STRIDE;

			if (ENABLE_RANDOM_MOVEMENT) {
				const { x: vortexX, y: vortexY } = vortexCenterRef;

				// Calculate distance from vortex center
				const dxVortex = dotsData[idx + X] - vortexX;
				const dyVortex = dotsData[idx + Y] - vortexY;
				const distanceFromVortex = Math.sqrt(
					dxVortex * dxVortex + dyVortex * dyVortex,
				);

				// Calculate angle from vortex center
				const angleFromVortex = Math.atan2(dyVortex, dxVortex);

				// Apply vortex force
				const vortexForce =
					VORTEX_STRENGTH *
					(1 + distanceFromVortex * VORTEX_RADIUS_FACTOR);
				dotsData[idx + VX] += -Math.sin(angleFromVortex) * vortexForce;
				dotsData[idx + VY] += Math.cos(angleFromVortex) * vortexForce;

				// Update random movement
				dotsData[idx + RANDOM_ANGLE] +=
					(Math.random() - 0.5) * RANDOM_MOVEMENT_CHANGE_RATE;
				dotsData[idx + RANDOM_SPEED] = Math.max(
					0.1,
					dotsData[idx + RANDOM_SPEED] + (Math.random() - 0.5) * 0.1,
				);

				// Apply random movement
				dotsData[idx + VX] +=
					Math.cos(dotsData[idx + RANDOM_ANGLE]) *
					dotsData[idx + RANDOM_SPEED];
				dotsData[idx + VY] +=
					Math.sin(dotsData[idx + RANDOM_ANGLE]) *
					dotsData[idx + RANDOM_SPEED];
			}

			// Pull the dot back toward its original position
			const dxOrigin = dotsData[idx + ORIGIN_X] - dotsData[idx + X];
			const dyOrigin = dotsData[idx + ORIGIN_Y] - dotsData[idx + Y];
			dotsData[idx + VX] += dxOrigin * RETURN_FORCE_FACTOR;
			dotsData[idx + VY] += dyOrigin * RETURN_FORCE_FACTOR;

			// If mouse is active, attract nearby dots
			if (mouseRef.active) {
				const dxMouse = mouseRef.x - dotsData[idx + X];
				const dyMouse = mouseRef.y - dotsData[idx + Y];

				const distSq = dxMouse * dxMouse + dyMouse * dyMouse;
				if (distSq < MAX_DIST * MAX_DIST) {
					const distance = Math.sqrt(distSq);
					const force = (1 - distance / MAX_DIST) * 0.6;
					dotsData[idx + VX] += dxMouse * force * MOUSE_FORCE_FACTOR;
					dotsData[idx + VY] += dyMouse * force * MOUSE_FORCE_FACTOR;
				}
			}

			// Update position
			dotsData[idx + X] += dotsData[idx + VX];
			dotsData[idx + Y] += dotsData[idx + VY];

			// Damp velocity
			dotsData[idx + VX] *= VELOCITY_DAMP;
			dotsData[idx + VY] *= VELOCITY_DAMP;
		}

		// Draw dots
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (USE_IMAGE_DATA) {
			// Draw using ImageData
			const imageData = ctx.createImageData(canvas.width, canvas.height);
			const data = imageData.data;

			for (let i = 0; i < numDots; i++) {
				const idx = i * STRIDE;
				const x = Math.round(dotsData[idx + X]);
				const y = Math.round(dotsData[idx + Y]);

				// Skip if out of bounds
				if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height)
					continue;

				// Calculate pixel index (4 bytes per pixel: R, G, B, A)
				const pixelIdx = (y * canvas.width + x) * 4;

				// Set pixel color: rgba(199, 199, 199, 0.2)
				data[pixelIdx] = 199; // R
				data[pixelIdx + 1] = 199; // G
				data[pixelIdx + 2] = 199; // B
				data[pixelIdx + 3] = 51; // A (0.2 * 255)
			}

			ctx.putImageData(imageData, 0, 0);
		} else {
			// Draw using arc() calls
			ctx.fillStyle = "rgba(199, 199, 199, 0.2)";

			for (let i = 0; i < numDots; i++) {
				const idx = i * STRIDE;
				ctx.beginPath();
				ctx.arc(dotsData[idx + X], dotsData[idx + Y], 1.1, 0, 2.2);
				ctx.fill();
			}
		}

		animationFrameId = requestAnimationFrame(animate);
	}

	onMount(() => {
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const context = canvas.getContext("2d");
		if (!context) throw new Error("Could not get 2D context");
		ctx = context;

		vortexCenterRef.x = canvas.width / 2;
		vortexCenterRef.y = canvas.height / 2;

		initializeDots(canvas.width, canvas.height);

		window.addEventListener("mousemove", handleMove);
		window.addEventListener("touchmove", handleMove);
		window.addEventListener("resize", handleResize);

		animationFrameId = requestAnimationFrame(animate);
	});

	onDestroy(() => {
		window.removeEventListener("mousemove", handleMove);
		window.removeEventListener("touchmove", handleMove);
		window.removeEventListener("resize", handleResize);
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	});
</script>

<canvas bind:this={canvas} class="cavas-style"></canvas>

<style lang="scss">
	.cavas-style {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
	}
</style>
