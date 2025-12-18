<script lang="ts">
	import { onMount } from 'svelte';

	let iframeRef: HTMLIFrameElement;

	onMount(() => {
		const iframe = iframeRef;
		if (iframe) {
			const handleLoad = () => {
				setTimeout(() => {
					try {
						// Try to access iframe content (may fail due to CORS)
						const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
						if (iframeDoc) {
							const elements = iframeDoc.querySelectorAll('.paging-eof.sc-ir');
							elements.forEach(el => el.remove());
						}
					} catch {
						console.log('Cannot access iframe content due to CORS restrictions');
					}
				}, 2000);
			};

			iframe.addEventListener('load', handleLoad);
			return () => iframe.removeEventListener('load', handleLoad);
		}
	});
</script>

<div class="container container-thin px-4 py-8 mx-auto">
	<div>
		<!-- Bottom portion -->
		<h1 class="text-2xl md:text-3xl font-light mt-30 h1LetterSpacing">
			Origins
		</h1>
		<hr />
		<br />
		<div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-8 p-[24px]">
			<div class="md:col-span-4 lg:col-span-5">
				<p>
					My music journey started out as a passion for playing bass guitar in a punk / alternative rock band that formed in college. I fell in love with it.
					<br /> <br />
					As the band came to an end I decided to continue to cultivate this side of me. I took what I learnt and picked up music production.
					I loved and adored poetry since my early years and I could still remember the first time I discovered Snoop Dogg.
					So I came back to this part of myself and found home in the genre of hip hop.
					<br /> <br />
					Since starting my journey I created and released over a hunred tracks. Instrumentals, rap songs, electronic, breakcore and a mix of different genres.
					Some of these release came under different monikers as I continue to find new sides of me.
					<br /> <br />
					Currently I am apart of Zooluft art collective with whose members I continue to collaborate, make new music and improve my craft.
				</p>
			</div>
		</div>

		<!-- Bottom portion -->
		<h1 class="text-2xl md:text-3xl font-light mt-30 h1LetterSpacing">
			Portfolio
		</h1>
		<hr />
		<br />

		... More to come
		<br />
		<br />

		<h2>F444 - F4 § T4R</h2>
		<p>Collection of electronic breakcore inspired songs</p>
		<div class="mt-2">
			<iframe
				bind:this={iframeRef}
				width="100%"
				height="450"
				scrolling="no"
				frameBorder="no"
				allow="autoplay"
				title="F4 § T4R SoundCloud Playlist"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1977563776&color=%23c2b3f3&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
			></iframe>
			<div style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;">
				<a href="https://soundcloud.com/zooluft" title="Zooluft Records" target="_blank" style="color: #cccccc; text-decoration: none;">Zooluft Records</a> · <a href="https://soundcloud.com/zooluft/sets/f4-t4r" title="F4 § T4R" target="_blank" style="color: #cccccc; text-decoration: none;">F4 § T4R</a>
			</div>
		</div>

		<br />
		<br />
		<br />

		<h2>Louvki - Early releases</h2>
		<p>Experimental instrumentals and rap songs and collections of early works.</p>
		<div class="mt-2 gridContainer">
			<iframe
				style="border: 0; width: 350px; height: 350px;"
				title="Pacific by louvki"
				src="https://bandcamp.com/EmbeddedPlayer/track=3243975742/size=large/bgcol=ffffff/linkcol=333333/minimal=true/transparent=true/"
				seamless
			>
				<a href="https://louvki.bandcamp.com/track/pacific">Pacific by louvki</a>
			</iframe>

			<iframe
				style="border: 0; width: 350px; height: 350px;"
				title="Tranquility drive by louvki"
				src="https://bandcamp.com/EmbeddedPlayer/track=3571161024/size=large/bgcol=ffffff/linkcol=333333/minimal=true/transparent=true/"
				seamless
			>
				<a href="https://louvki.bandcamp.com/track/tranquility-drive">Tranquility drive by louvki</a>
			</iframe>

			<iframe
				style="border: 0; width: 350px; height: 350px;"
				title="Winter23 by louvki"
				src="https://bandcamp.com/EmbeddedPlayer/album=2082759833/size=large/bgcol=ffffff/linkcol=333333/minimal=true/transparent=true/"
				seamless
			>
				<a href="https://louvki.bandcamp.com/album/winter23">Winter23 by louvki</a>
			</iframe>

			<iframe
				style="border: 0; width: 350px; height: 350px;"
				title="There goes Love... by louvki"
				src="https://bandcamp.com/EmbeddedPlayer/album=3185789495/size=large/bgcol=ffffff/linkcol=333333/minimal=true/transparent=true/"
				seamless
			>
				<a href="https://louvki.bandcamp.com/album/there-goes-love">There goes Love... by louvki</a>
			</iframe>

			<iframe
				style="border: 0; width: 350px; height: 350px;"
				title="Release me! by louvki"
				src="https://bandcamp.com/EmbeddedPlayer/album=2635872379/size=large/bgcol=ffffff/linkcol=333333/minimal=true/transparent=true/"
				seamless
			>
				<a href="https://louvki.bandcamp.com/album/release-me">Release me! by louvki</a>
			</iframe>

			<iframe
				style="border: 0; width: 350px; height: 350px;"
				title="Louvki! by louvki"
				src="https://bandcamp.com/EmbeddedPlayer/album=1566108345/size=large/bgcol=ffffff/linkcol=333333/minimal=true/transparent=true/"
				seamless
			>
				<a href="https://louvki.bandcamp.com/album/louvki">Louvki! by louvki</a>
			</iframe>
		</div>
	</div>
</div>

<style lang="scss">
	.gridContainer {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, auto);
		gap: 4rem;
		max-width: 1200px;
		width: 100%;
	}

	.gridContainer iframe {
		justify-self: center;
		align-self: start;
	}

	/* Responsive design for smaller screens */
	@media (max-width: 1200px) {
		.gridContainer {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, auto);
			gap: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.gridContainer {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(6, auto);
			gap: 1rem;
		}
	}
</style>

