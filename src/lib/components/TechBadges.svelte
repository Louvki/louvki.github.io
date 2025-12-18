<script lang="ts">
	import { MAIN_CATEGORY } from '../constants/TechBadgeCategories';

	interface TechBadge {
		label: string;
		mainCategory: MAIN_CATEGORY;
		icon?: string;
		excludeFromFullList?: boolean;
	}

	const TECH_BADGES: TechBadge[] = [
		// Programming Languages
		{ label: 'Javascript', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/javascript.svg' },
		{ label: 'Typescript', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/ts.svg' },
		{ label: 'C#', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/c-sharp.svg' },
		{ label: 'Dart', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/dart.svg', excludeFromFullList: true },
		{ label: 'Java', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/java.svg', excludeFromFullList: true },
		{ label: 'C++', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/c++.svg', excludeFromFullList: true },
		{ label: 'PHP', mainCategory: MAIN_CATEGORY.BE },

		// Styling & Preprocessors
		{ label: 'CSS', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/css.svg' },
		{ label: 'SCSS', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/sass.svg' },
		{ label: 'HTML', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/html.svg' },

		// Backend & Server-Side Technologies
		{ label: 'Node.js', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/nodejs.svg' },
		{ label: 'ASP.NET', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/asp_net.svg' },
		{ label: 'MySql', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/mysql.svg' },
		{ label: 'Firebase', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/firebase.svg' },

		// Frontend Frameworks & Libraries
		{ label: 'Vue', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/vuejs.svg' },
		{ label: 'React', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/react.svg' },
		{ label: 'Angular', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/angular.svg' },
		{ label: 'Nuxt', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/nuxt.svg' },
		{ label: 'Nuxt.js', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/nuxt.svg' },
		{ label: 'Next', mainCategory: MAIN_CATEGORY.FE },
		{ label: 'Next.js', mainCategory: MAIN_CATEGORY.FE },
		{ label: 'Flutter', mainCategory: MAIN_CATEGORY.OTHER, icon: '/icons/flutter.svg' },
		{ label: 'Nativescript', mainCategory: MAIN_CATEGORY.OTHER, icon: '/icons/nativescript.svg', excludeFromFullList: true },
		{ label: 'Cordova Apache', mainCategory: MAIN_CATEGORY.OTHER, icon: '/icons/cordova.svg', excludeFromFullList: true },

		// State Management
		{ label: 'Vuex', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/vuex.svg' },
		{ label: 'Rxjs', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/rxjs.svg' },

		// Build Tools
		{ label: 'Vite', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/vitejs.svg' },
		{ label: 'Webpack', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/webpack.svg' },

		// Content Management Systems (CMS)
		{ label: 'Wordpress', mainCategory: MAIN_CATEGORY.OTHER, icon: '/icons/wordpress.svg' },
		{ label: 'Ghost CMS', mainCategory: MAIN_CATEGORY.OTHER, icon: '/icons/ghostcms.svg' },
		{ label: 'Squarespace', mainCategory: MAIN_CATEGORY.OTHER },

		// AI & Cloud Services
		{ label: 'OpenAI', mainCategory: MAIN_CATEGORY.OTHER, icon: '/icons/openai.svg' },
		{ label: 'AWS', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/aws.svg' },
		{ label: 'Microsoft Azure', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/microsoft-azure.svg' },

		// AWS Services
		{ label: 'S3', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/aws-s3.svg' },
		{ label: 'Lightsail', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/aws-lightsail.svg' },

		// CI/CD Tools
		{ label: 'Github Actions', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/github.svg' },
		{ label: 'Codepipeline', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/aws-codepipeline.svg' },
		{ label: 'Codebuild', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/aws-codebuild.svg' },

		// Testing & Development Tools
		{ label: 'Jest', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/jest.svg' },
		{ label: 'Playwright', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/playwright.svg' },
		{ label: 'Storybook', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/storybook.svg' },

		// Design & UI/UX
		{ label: 'Figma', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/figma.svg' },
		{ label: 'Adobe XD', mainCategory: MAIN_CATEGORY.FE, icon: '/icons/adobe-xd.svg' },

		// Project Management & Collaboration Tools
		{ label: 'SCRUM', mainCategory: MAIN_CATEGORY.OTHER, excludeFromFullList: true },
		{ label: 'Zenhub', mainCategory: MAIN_CATEGORY.OTHER },
		{ label: 'Jira', mainCategory: MAIN_CATEGORY.OTHER },
		{ label: 'Google suite', mainCategory: MAIN_CATEGORY.OTHER },
		{ label: 'Microsoft Teams', mainCategory: MAIN_CATEGORY.OTHER },
		{ label: 'Monday', mainCategory: MAIN_CATEGORY.OTHER, excludeFromFullList: true },

		// Skills & Expertise
		{ label: 'Team Management', mainCategory: MAIN_CATEGORY.SOFT_SKILL },
		{ label: 'SEO optimization', mainCategory: MAIN_CATEGORY.OTHER },
		{ label: 'SEO', mainCategory: MAIN_CATEGORY.OTHER },
		{ label: 'Performance optimization', mainCategory: MAIN_CATEGORY.SOFT_SKILL },
		{ label: 'Cross platform development', mainCategory: MAIN_CATEGORY.SOFT_SKILL },
		{ label: 'Design', mainCategory: MAIN_CATEGORY.SOFT_SKILL },
		{ label: 'UX', mainCategory: MAIN_CATEGORY.SOFT_SKILL },

		// Other
		{ label: 'JUCE', mainCategory: MAIN_CATEGORY.BE, icon: '/icons/juce.svg', excludeFromFullList: true },
	];

	interface Props {
		categoryToShow?: MAIN_CATEGORY;
		labels?: string[];
	}

	let { categoryToShow, labels, pdfPrint = false }: Props & { pdfPrint?: boolean } = $props();

	const badgesToShow = $derived((() => {
		if (categoryToShow) {
			return TECH_BADGES.filter(badge => badge.mainCategory === categoryToShow);
		} else if (labels) {
			const found: TechBadge[] = [];
			labels.forEach(requestedLabel => {
				const badge = TECH_BADGES.find(badge => requestedLabel.toLowerCase() === badge.label.toLowerCase());
				if (!badge) {
					console.log('Missing', requestedLabel);
				} else {
					found.push(badge);
				}
			});
			return found;
		}
		return TECH_BADGES;
	})());
</script>

<div class="flex flex-wrap gap-3">
	{#each badgesToShow as { label, icon }}
		<div
			class="inline-flex items-center rounded-md px-3 py-1 tech-badge-background-color tech-badge-text-color"
		>
			{#if icon}
				<img
					src={icon}
					alt={label}
					width="20"
					height="20"
					class="mr-2"
					loading={pdfPrint ? 'eager' : 'lazy'}
				/>
			{/if}
			<span class="text-sm font-semibold">{label}</span>
		</div>
	{/each}
</div>

