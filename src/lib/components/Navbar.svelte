<script lang="ts">
	import { theme } from '../stores/theme';

	export let pdfPrint: boolean = false;

	function toggleTheme() {
		theme.toggle();
	}
</script>

{#if !pdfPrint}
	<nav class="fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm py-4 px-12 flex justify-between items-center border-b border-white">
		<div class="flex justify-between items-center mx-auto container">
			<div class="flex items-center space-x-6">
				<a href="#/" class="text-white hover:text-gray-300 transition">
					Home
				</a>
				<a href="#/resume" class="text-white hover:text-gray-300 transition">
					Resume
				</a>
				<a href="#/music" class="text-white hover:text-gray-300 transition">
					Music Portfolio
				</a>
			</div>
			<div class="flex items-center space-x-4">
				<button
					onclick={toggleTheme}
					class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition cursor-pointer no-underline"
				>
					{$theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
				</button>
			</div>
		</div>
	</nav>
{/if}

