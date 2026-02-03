<script lang="ts">
	import { onMount } from "svelte";
	let slop = "......";

	function generateSlop() {
		var msg = "Ｌ Ｏ Ｕ Ｖ Ｋ Ｉ";

		var speed = 20;

		var decos = [
			"•၊၊||၊|။||||||၊|၊၊•",
			"─────୨ৎ─────",
			"✧･ﾟ: *✧･ﾟ:*",
			"⋆｡°✩⋆｡°✩",
			"▰▱▰▱▰▱▰▱",
			"◈◇◈◇◈◇◈◇",
			"꒰ঌ┈┈┈┈໒꒱",
		];
		var decoIndex = 0;
		var rotationCount = 0;

		function getDeco() {
			return decos[decoIndex % decos.length];
		}

		function buildHalfMessage() {
			var deco = getDeco();
			return deco + msg + deco + msg;
		}

		let updatedString = buildHalfMessage() + buildHalfMessage();
		let halfLength = buildHalfMessage().length;
		slop = updatedString;

		let secondCounter = 0;
		trimMe();

		function trimMe() {
			updatedString = updatedString.slice(1);
			slop = updatedString;

			var dumbtastic = updatedString.length > 2700 ? halfLength : 14;
			if (secondCounter === dumbtastic) {
				rotationCount++;

				if (rotationCount % 2 === 0) {
					decoIndex++;
				}
				updatedString += buildHalfMessage();
				halfLength = buildHalfMessage().length;
				secondCounter = 0;
			}

			secondCounter++;
			window.setTimeout(trimMe, speed);
		}
	}

	function setSlop(tx: string) {
		slop = tx;
	}
	onMount(() => {
		setTimeout(() => setSlop("Initiating"), 3000);
		setTimeout(() => setSlop("..."), 4000);
		setTimeout(() => setSlop("3"), 4200);
		setTimeout(() => setSlop("2"), 4500);
		setTimeout(() => setSlop("1"), 4700);
		setTimeout(generateSlop, 5000);
	});
</script>

<div class="container mx-auto px-4 py-8">
	<div class="flex flex-col items-center">
		<!-- <img
			src="/lo-logo2.gif"
			alt="Lukas Vismantas Logo"
			width="500"
			height="500"
			class="mb-4"
		/> -->
		<div class="flex flex-row items-center">
			<a
				href="#/resume"
				class="text-xl text-blue-400 hover:text-blue-300 underline transition-colors mr-8"
			>
				View Resume
			</a>
			<a
				href="#/music"
				class="text-xl text-blue-400 hover:text-blue-300 underline transition-colors mr-8"
			>
				View Music portfolio
			</a>
		</div>
	</div>
	<br />
	<br />
	<h2 class="text-2xl md:text-2xl">Currently working on</h2>
	<br />

	<h3 class="text-xl md:text-xl">DNA Synth:</h3>
	<p class="text-sm italic">
		Art project by Runo Mustalintu. They want to build a musical instrument
		that would in take genetic information of species and output music. The
		more genetically rich the environment - the more full the sound.
	</p>
	<p>
		<br />
		---
		<br />
		<span class="text-lime-500">2026/01/07:</span> Moved away from JUCE and
		C++ and now using Max4Live and Node.js due to faster development cycles.
		<br />
		---
		<br />
		<span class="text-lime-500">2025/11/10:</span> Developing Audio VST
		plugins using C++ and JUCE.
		<br />
		---
	</p>

	<div class="black-box-big">
		<div class="black-box">
			<div class="slop-box">
				{slop}
			</div>
		</div>
	</div>
</div>

<style>
	.slop-box {
		position: absolute;
		width: 510px;
		min-width: 500px;
		height: 500px;
		z-index: 2;
		background-color: transparent;
	}
	.black-box {
		margin-top: 67px;
		margin-left: 112px;
		z-index: 20;
		background-color: black;
		width: 500px;
		height: 500px;
	}

	.black-box-big {
		margin-top: 67px;
		margin-left: 112px;
		z-index: 20;
		width: 540px;
		height: 600;
		overflow-y: hidden;
		overflow-x: hidden;
	}
</style>
