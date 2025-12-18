<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Dot {
		x: number;
		y: number;
		vx: number;
		vy: number;
		originX: number;
		originY: number;
		randomAngle: number;
		randomSpeed: number;
	}

	const SPACING = 20;
	const MAX_DIST = 100;
	const RETURN_FORCE_FACTOR = 0.01;
	const MOUSE_FORCE_FACTOR = 0.01;
	const VELOCITY_DAMP = 0.9;
	const RANDOM_MOVEMENT_SPEED = 0.2;
	const RANDOM_MOVEMENT_CHANGE_RATE = 0.02;
	const VORTEX_STRENGTH = 0.0005;
	const VORTEX_RADIUS_FACTOR = 0.0001;

	let canvas: HTMLCanvasElement;
	let dots: Dot[] = [];
	let animationFrameId: number;
	const mouseRef = { x: 0, y: 0, active: false };
	const vortexCenterRef = { x: 0, y: 0 };

	function initializeDots(width: number, height: number): Dot[] {
		const initialDots: Dot[] = [];
		for (let x = 0; x < width; x += SPACING) {
			for (let y = 0; y < height; y += SPACING) {
				initialDots.push({
					x,
					y,
					vx: 0,
					vy: 0,
					originX: x,
					originY: y,
					randomAngle: Math.random() * Math.PI * 2,
					randomSpeed: Math.random() * RANDOM_MOVEMENT_SPEED,
				});
			}
		}
		return initialDots;
	}

	function handleMove(e: MouseEvent | TouchEvent) {
		let x, y;

		if ('touches' in e) {
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

		dots = initializeDots(canvas.width, canvas.height);
	}

	function animate() {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Update dots
		dots = dots.map((dot) => {
			let { x, y, vx, vy, randomAngle, randomSpeed } = dot;
			const { originX, originY } = dot;
			const { x: vortexX, y: vortexY } = vortexCenterRef;

			// Calculate distance from vortex center
			const dxVortex = x - vortexX;
			const dyVortex = y - vortexY;
			const distanceFromVortex = Math.sqrt(dxVortex * dxVortex + dyVortex * dyVortex);

			// Calculate angle from vortex center
			const angleFromVortex = Math.atan2(dyVortex, dxVortex);

			// Apply vortex force
			const vortexForce = VORTEX_STRENGTH * (1 + distanceFromVortex * VORTEX_RADIUS_FACTOR);
			vx += -Math.sin(angleFromVortex) * vortexForce;
			vy += Math.cos(angleFromVortex) * vortexForce;

			// Update random movement
			randomAngle += (Math.random() - 0.5) * RANDOM_MOVEMENT_CHANGE_RATE;
			randomSpeed = Math.max(0.1, randomSpeed + (Math.random() - 0.5) * 0.1);

			// Apply random movement
			vx += Math.cos(randomAngle) * randomSpeed;
			vy += Math.sin(randomAngle) * randomSpeed;

			// Pull the dot back toward its original position
			const dxOrigin = originX - x;
			const dyOrigin = originY - y;
			vx += dxOrigin * RETURN_FORCE_FACTOR;
			vy += dyOrigin * RETURN_FORCE_FACTOR;

			// If mouse is active, attract nearby dots
			if (mouseRef.active) {
				const dxMouse = mouseRef.x - x;
				const dyMouse = mouseRef.y - y;
				const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

				if (distance < MAX_DIST) {
					const force = (1 - distance / MAX_DIST) * 0.6;
					vx += dxMouse * force * MOUSE_FORCE_FACTOR;
					vy += dyMouse * force * MOUSE_FORCE_FACTOR;
				}
			}

			// Update position
			x += vx;
			y += vy;

			// Damp velocity
			vx *= VELOCITY_DAMP;
			vy *= VELOCITY_DAMP;

			return { x, y, vx, vy, originX, originY, randomAngle, randomSpeed };
		});

		// Draw dots
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		dots.forEach((dot) => {
			ctx.beginPath();
			ctx.arc(dot.x, dot.y, 1.1, 0, 1.1 * Math.PI);
			ctx.fillStyle = '#c7c7c7';
			ctx.fill();
		});

		animationFrameId = requestAnimationFrame(animate);
	}

	onMount(() => {
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		vortexCenterRef.x = canvas.width / 2;
		vortexCenterRef.y = canvas.height / 2;

		dots = initializeDots(canvas.width, canvas.height);

		window.addEventListener('mousemove', handleMove);
		window.addEventListener('touchmove', handleMove);
		window.addEventListener('resize', handleResize);

		animationFrameId = requestAnimationFrame(animate);
	});

	onDestroy(() => {
		window.removeEventListener('mousemove', handleMove);
		window.removeEventListener('touchmove', handleMove);
		window.removeEventListener('resize', handleResize);
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	});
</script>

<canvas
	bind:this={canvas}
	style="position: fixed; top: 0; left: 0; z-index: -1; width: 100vw; height: 100vh; pointer-events: none;"
></canvas>

