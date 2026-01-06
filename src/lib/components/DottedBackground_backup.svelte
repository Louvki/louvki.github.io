<script lang="ts">
	import { onMount, onDestroy } from "svelte";

	const SPACING = 3;
	const MAX_DIST = 100;

	const RETURN_FORCE_FACTOR = 0.01;
	const MOUSE_FORCE_FACTOR = 0.2;
	const VELOCITY_DAMP = 0.9;

	const VORTEX_STRENGTH = 0.001;
	const VORTEX_RADIUS_FACTOR = 0.0009;

	const ENABLE_RANDOM_MOVEMENT = false;
	const RANDOM_MOVEMENT_SPEED = 0.2;
	const RANDOM_MOVEMENT_CHANGE_RATE = 0.02;

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext;
	let program: WebGLProgram;
	let positionBuffer: WebGLBuffer;
	let positionData: Float32Array; // X, Y positions (sent to GPU)
	let velocityData: Float32Array; // VX, VY, ORIGIN_X, ORIGIN_Y, RANDOM_ANGLE, RANDOM_SPEED
	let numDots: number = 0;
	let animationFrameId: number;

	const mouseRef = { x: 0, y: 0, active: false };
	const vortexCenterRef = { x: 0, y: 0 };

	// Vertex shader - runs for each particle
	const vertexShaderSource = `
		attribute vec2 a_position;
		uniform vec2 u_resolution;
		
		void main() {
			// Convert from pixels to clip space (-1 to 1)
			vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;
			gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
			gl_PointSize = 2.0;
		}
	`;

	// Fragment shader - colors each particle
	const fragmentShaderSource = `
		precision mediump float;
		
		void main() {
			// Make circular particles
			vec2 center = gl_PointCoord - vec2(0.5);
			if (length(center) > 0.5) discard;
			
			gl_FragColor = vec4(0.78, 0.78, 0.78, 0.2);
		}
	`;

	function createShader(
		gl: WebGLRenderingContext,
		type: number,
		source: string,
	): WebGLShader {
		const shader = gl.createShader(type);
		if (!shader) throw new Error("Failed to create shader");

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			const info = gl.getShaderInfoLog(shader);
			gl.deleteShader(shader);
			throw new Error("Shader compile error: " + info);
		}

		return shader;
	}

	function createProgram(gl: WebGLRenderingContext): WebGLProgram {
		const vertexShader = createShader(
			gl,
			gl.VERTEX_SHADER,
			vertexShaderSource,
		);
		const fragmentShader = createShader(
			gl,
			gl.FRAGMENT_SHADER,
			fragmentShaderSource,
		);

		const program = gl.createProgram();
		if (!program) throw new Error("Failed to create program");

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			const info = gl.getProgramInfoLog(program);
			throw new Error("Program link error: " + info);
		}

		return program;
	}

	function initializeDots(width: number, height: number): void {
		const positions: number[] = [];
		const velocities: number[] = [];

		for (let x = 0; x < width; x += SPACING) {
			for (let y = 0; y < height; y += SPACING) {
				// Position data (sent to GPU)
				positions.push(x, y);

				// Velocity data (stays on CPU)
				// VX, VY, ORIGIN_X, ORIGIN_Y, RANDOM_ANGLE, RANDOM_SPEED
				velocities.push(
					0, // VX
					0, // VY
					x, // ORIGIN_X
					y, // ORIGIN_Y
					Math.random() * Math.PI * 2, // RANDOM_ANGLE
					Math.random() * RANDOM_MOVEMENT_SPEED, // RANDOM_SPEED
				);
			}
		}

		numDots = positions.length / 2;
		positionData = new Float32Array(positions);
		velocityData = new Float32Array(velocities);

		// Update WebGL resolution uniform if needed
		if (gl && program) {
			const resolutionLocation = gl.getUniformLocation(
				program,
				"u_resolution",
			);
			gl.uniform2f(resolutionLocation, width, height);
		}
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
		if (!canvas || !gl) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Update WebGL viewport
		gl.viewport(0, 0, canvas.width, canvas.height);

		vortexCenterRef.x = canvas.width / 2;
		vortexCenterRef.y = canvas.height / 2;

		initializeDots(canvas.width, canvas.height);
	}

	function animate() {
		if (!canvas || !gl) return;

		// Update physics
		for (let i = 0; i < numDots; i++) {
			const posIdx = i * 2; // X, Y
			const velIdx = i * 6; // VX, VY, ORIGIN_X, ORIGIN_Y, RANDOM_ANGLE, RANDOM_SPEED

			if (ENABLE_RANDOM_MOVEMENT) {
				const { x: vortexX, y: vortexY } = vortexCenterRef;

				// Calculate distance from vortex center
				const dxVortex = positionData[posIdx] - vortexX;
				const dyVortex = positionData[posIdx + 1] - vortexY;
				const distanceFromVortex = Math.sqrt(
					dxVortex * dxVortex + dyVortex * dyVortex,
				);

				// Calculate angle from vortex center
				const angleFromVortex = Math.atan2(dyVortex, dxVortex);

				// Apply vortex force
				const vortexForce =
					VORTEX_STRENGTH *
					(1 + distanceFromVortex * VORTEX_RADIUS_FACTOR);
				velocityData[velIdx] +=
					-Math.sin(angleFromVortex) * vortexForce;
				velocityData[velIdx + 1] +=
					Math.cos(angleFromVortex) * vortexForce;

				// Update random movement
				velocityData[velIdx + 4] +=
					(Math.random() - 0.5) * RANDOM_MOVEMENT_CHANGE_RATE;
				velocityData[velIdx + 5] = Math.max(
					0.1,
					velocityData[velIdx + 5] + (Math.random() - 0.5) * 0.1,
				);

				// Apply random movement
				velocityData[velIdx] +=
					Math.cos(velocityData[velIdx + 4]) *
					velocityData[velIdx + 5];
				velocityData[velIdx + 1] +=
					Math.sin(velocityData[velIdx + 4]) *
					velocityData[velIdx + 5];
			}

			// Pull the dot back toward its original position
			const dxOrigin = velocityData[velIdx + 2] - positionData[posIdx];
			const dyOrigin =
				velocityData[velIdx + 3] - positionData[posIdx + 1];
			velocityData[velIdx] += dxOrigin * RETURN_FORCE_FACTOR;
			velocityData[velIdx + 1] += dyOrigin * RETURN_FORCE_FACTOR;

			// If mouse is active, attract nearby dots
			if (mouseRef.active) {
				const dxMouse = mouseRef.x - positionData[posIdx];
				const dyMouse = mouseRef.y - positionData[posIdx + 1];

				const distSq = dxMouse * dxMouse + dyMouse * dyMouse;
				if (distSq < MAX_DIST * MAX_DIST) {
					const distance = Math.sqrt(distSq);
					const force = (1 - distance / MAX_DIST) * 0.6;
					velocityData[velIdx] +=
						dxMouse * force * MOUSE_FORCE_FACTOR;
					velocityData[velIdx + 1] +=
						dyMouse * force * MOUSE_FORCE_FACTOR;
				}
			}

			// Update position
			positionData[posIdx] += velocityData[velIdx];
			positionData[posIdx + 1] += velocityData[velIdx + 1];

			// Damp velocity
			velocityData[velIdx] *= VELOCITY_DAMP;
			velocityData[velIdx + 1] *= VELOCITY_DAMP;
		}

		// Upload updated positions to GPU
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.DYNAMIC_DRAW);

		// Clear and render
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.POINTS, 0, numDots);

		animationFrameId = requestAnimationFrame(animate);
	}

	onMount(() => {
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Get WebGL context
		const context = canvas.getContext("webgl");
		if (!context) throw new Error("WebGL not supported");
		gl = context;

		// Set viewport
		gl.viewport(0, 0, canvas.width, canvas.height);

		// Enable alpha blending for transparency
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		// Set clear color (transparent background)
		gl.clearColor(0, 0, 0, 0);

		// Create and compile shaders
		program = createProgram(gl);
		gl.useProgram(program);

		// Set resolution uniform
		const resolutionLocation = gl.getUniformLocation(
			program,
			"u_resolution",
		);
		gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

		// Create position buffer
		const buffer = gl.createBuffer();
		if (!buffer) throw new Error("Failed to create buffer");
		positionBuffer = buffer;

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		// Setup position attribute
		const positionLocation = gl.getAttribLocation(program, "a_position");
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		vortexCenterRef.x = canvas.width / 2;
		vortexCenterRef.y = canvas.height / 2;

		// Initialize particles
		initializeDots(canvas.width, canvas.height);

		// Event listeners
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
