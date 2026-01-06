<script lang="ts">
	import { onMount } from "svelte";
	import { theme } from "./lib/stores/theme";
	import Navbar from "./lib/components/Navbar.svelte";
	import DottedBackground from "./lib/components/DottedBackground.svelte";
	import Home from "./pages/Home.svelte";
	import Resume from "./pages/Resume.svelte";
	import Music from "./pages/Music.svelte";

	let currentPath = "/";
	let pdfPrint = false;
	let isBackgroundVisible = true;

	function getSearchParams(): URLSearchParams {
		const hash = window.location.hash;
		const parts = hash.split("?");
		return new URLSearchParams(parts[1] || "");
	}

	function updatePath() {
		const hash = window.location.hash.slice(1) || "/";
		currentPath = hash.split("?")[0];
		const params = getSearchParams();
		pdfPrint = params.get("pdfPrint") === "true";
	}

	onMount(() => {
		theme.init();

		// Handle initial load
		updatePath();

		// Listen for hash changes
		const handleHashChange = () => {
			updatePath();
		};
		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Monofett&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if isBackgroundVisible}
	<DottedBackground />
{/if}
<Navbar {pdfPrint} />
<div class="mt-30"></div>

{#if currentPath === "/"}
	<Home />
{:else if currentPath === "/resume"}
	<Resume {pdfPrint} />
{:else if currentPath === "/music"}
	<Music />
{/if}

<div class="mt-20"></div>
