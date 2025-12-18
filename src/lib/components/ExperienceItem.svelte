<script lang="ts">
	import { formatDateRange } from '../utils/dateUtils';

	interface Props {
		company: string;
		dateRange?: string;
		role?: string;
		description?: string;
		technologies?: string[];
		responsibilities?: string[];
		genericListItems?: string[];
		headerLink?: string;
		children?: import('svelte').Snippet;
	}

	let {
		company,
		dateRange,
		role,
		description,
		technologies,
		responsibilities,
		genericListItems,
		headerLink,
		children
	}: Props = $props();
</script>

<div class="experienceItem">
	<div class="headerFlexContainer">
		<h2 class="text-xl md:text-3xl font-bold text-pretty letterSpacing2px">
			{company}
		</h2>
		{#if dateRange}
			<div class="hidden md:flex flex flex-col relative min-w-[170px]">
				<span class="text-sm md:text-base font-thin">{formatDateRange(dateRange)}</span>
			</div>
		{/if}
	</div>

	{#if role || headerLink}
		<div class="mb-4">
			{#if headerLink}
				<a
					href={headerLink}
					target="_blank"
					class="text-base md:text-l italic foreground1-darker letterSpacing2px linkHover"
				>
					{headerLink}
				</a>
			{:else}
				<span class="text-base md:text-l italic foreground1-darker letterSpacing2px">
					{role}
				</span>
			{/if}
			{#if dateRange}
				<div class="md:hidden flex flex-col relative min-w-[170px]">
					<span class="text-sm md:text-base font-thin">{formatDateRange(dateRange)}</span>
				</div>
			{/if}
		</div>
	{/if}

	{#if description}
		<div>
			<h3 class="text-base font-bold">Description:</h3>
			<p class="mb-4">{description}</p>
		</div>
	{/if}

	{#if technologies && technologies.length > 0}
		<div>
			<h3 class="text-base font-bold">Technologies:</h3>
			<ul class="experienceList">
				{#each technologies as tech}
					<li>{tech}</li>
				{/each}
			</ul>
			<br />
		</div>
	{/if}

	{#if responsibilities && responsibilities.length > 0}
		<div>
			<h3 class="text-base font-bold">Responsibilities:</h3>
			<ul class="experienceList">
				{#each responsibilities as item}
					<li>{item}</li>
				{/each}
			</ul>
			<br />
		</div>
	{/if}

	{#if genericListItems && genericListItems.length > 0}
		<div>
			<ul class="experienceList">
				{#each genericListItems as item}
					<li>{item}</li>
				{/each}
			</ul>
			<br />
		</div>
	{/if}

	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	.headerFlexContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.experienceList {
		margin: 0;
		list-style-type: none;
		& > li {
			text-indent: 5px;
		}
		& > li:before {
			content: "-";
			text-indent: 5px;
			margin-right: 5px;
		}
	}

	.experienceItem {
		margin-bottom: 50px;
		padding: 24px;
		background: var(--background);
		border: 0px solid color-mix(in srgb, var(--foreground1-darker) 18%, transparent);
		border-radius: 12px;
		box-shadow:
			0 1px 2px -1px rgba(0, 0, 0, 0.01),
			0 1px 1px -1px rgba(0, 0, 0, 0.006);

		&:hover {
			box-shadow:
				0 1px 4px -1px rgba(0, 0, 0, 0.03),
				0 1px 2px -1px rgba(0, 0, 0, 0.01);
		}
	}

	.linkHover {
		position: relative;
		transition: color 0.3s ease;

		&:hover {
			color: #0066cc;

			&::after {
				transform: scaleX(1);
				transform-origin: left;
			}
		}

		&::after {
			content: "";
			position: absolute;
			width: 100%;
			height: 1px;
			bottom: -2px;
			left: 0;
			background-color: #0066cc;
			transform: scaleX(0);
			transform-origin: left;
			transition: transform 0.3s ease;
		}
	}
</style>

