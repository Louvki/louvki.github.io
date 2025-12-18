<script lang="ts">
	import { formatDateToYYYYMM, getAge } from '../lib/utils/dateUtils';
	import TechBadges from '../lib/components/TechBadges.svelte';
	import ExperienceItem from '../lib/components/ExperienceItem.svelte';
	import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import { faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	export let pdfPrint: boolean = false;

	const currentDate = formatDateToYYYYMM(new Date());
</script>

<div class="container container-thin px-4 py-8 mx-auto">
	<div>
		<!-- Top portion -->
		<div class="p-[24px]">
			<div class="flex flex-row">
				<div>
					<h1 class="text-5xl md:text-6xl h1WordSpacing h1LetterSpacing">Lukas Vismantas</h1>
					<h2 class="text-4xl md:text-5xl h1WordSpacing" style="font-family: 'Monofett', monospace;">Software Engineer</h2>

					<br />

					<a href="mailto:lukas.vismn@gmail.com" class="contactContainer">
						<FontAwesomeIcon icon={faEnvelope} />
						<span class="text-base md:text-lg">lukas.vismn@gmail.com</span>
					</a>

					<a href="https://www.linkedin.com/in/lukas-vismantas/" class="contactContainer">
						<FontAwesomeIcon icon={faLinkedin} />
						<span class="text-base md:text-lg">linkedin.com/lukas-vismantas</span>
					</a>

					<a href="https://github.com/Louvki" class="contactContainer">
						<FontAwesomeIcon icon={faSquareGithub} />
						<span class="text-base md:text-lg">github.com/louvki</span>
					</a>
				</div>
				<div class="ml-auto hidden md:block">
					<img
						width="300"
						height="300"
						src="/pfp.JPG"
						alt="Lukas" />
				</div>
			</div>

			{#if !pdfPrint}
				<div>
					<br />
					<a
						href="/resume-dark.pdf"
						download="resume-dark.pdf"
						class="flex items-center gap-2 max-w-fit px-4 py-2 text-white rounded-lg download-pdf-button-color transition"
					>
						<FontAwesomeIcon class="max-h-4" icon={faDownload} />
						Download Resume as PDF
					</a>
				</div>
			{/if}
		</div>

		<!-- Bottom portion -->
		<h1 class="text-2xl md:text-3xl font-light mt-30 h1LetterSpacing">
			ABOUT ME
		</h1>
		<hr />
		<br />
		<div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-8 p-[24px]">
			<div class="md:col-span-4 lg:col-span-5">
				<p>
					I am a {getAge('1996/04/12')}-year-old software developer from Lithuania with {getAge('2017/08/01')}+ years of professional experience and a BSc in Web Development. I specialize in building robust, user-focused and accessible web applications.
					<br /> <br />
					My technical expertise spans both frontend and backend development, with particular strength in Vue.js and modern JavaScript frameworks.
					<br /> <br />
					I speak fluent English, Lithuanian and I am on on a journey to learn French and Danish.
				</p>
			</div>
		</div>

		<!-- Bottom portion -->
		<h1 class="text-2xl md:text-3xl font-light mt-30 h1LetterSpacing">
			WORK EXPERIENCE
		</h1>

		<hr />
		<br />

		<!-- MyBanker -->
		<ExperienceItem
			company="MyBanker"
			dateRange={'2024/05 - ' + currentDate}
			role="Frontend developer"
			description="Financial sector. Online comparison platform that helps individuals find and compare financial products such as loans, savings accounts, and banking offers. It also offers consumers financial tools such as loan consolidation."
			technologies={[
				'Frontend: Vue, Javacscript, Wordpress',
				'Backend: EC2, S3, C#, ASP.NET, MySql',
				'Operations: Docker, Codepipeline, Codebuild, Github Actions',
			]}
			responsibilities={[
				'Creating and maintaining a custom validation solution.',
				'Initiating, planning and overseeing a migration from Vue2 to Vue3.',
				'Initiating, planning and overseeing test implementation both for unit tests and E2E tests.',
				'Testing and deploying releases into production.',
			]}
		>
			<TechBadges labels={['Javascript', 'Vue', 'Vuex', 'Vite', 'Webpack', 'Wordpress', 'OpenAI', 'C#', 'ASP.NET', 'MySql', 'Github actions', 'AWS', 'Codepipeline', 'Codebuild', 'S3', 'Jest', 'Playwright', 'SCRUM', 'Zenhub', 'Google suite']} {pdfPrint} />
		</ExperienceItem>

		<!-- Maersk -->
		<ExperienceItem
			company="Maersk"
			dateRange="2021/09 - 2023/08"
			role="Software developer"
			description="One of the leaders of the shipping and logistics industry."
			technologies={[
				'Frontend: Vue, Typescript, Javacscript, Webpack, Vite',
				'Backend: Microsoft Azure, C#, ASP.NET, MySql',
				'Operations: Docker, Github Actions',
			]}
			responsibilities={[
				'Rewriting legacy system code that handled container shipping into a Vue project.',
				'Bootstrapping new Vue3 projects as micro applications into the existing ecosystem.',
				'Extensive testing using Jest as well as keeping documentation up to date using Storybook.',
				'Collaborating with Backend developers and Designers to solve complex problems that spanned across multiple teams.',
			]}
		>
			<TechBadges labels={['Typescript', 'Javascript', 'Vue', 'Vuex', 'Vite', 'Webpack', 'Microsoft Azure', 'C#', 'ASP.NET', 'MySql', 'Github actions', 'Jest', 'Storybook', 'SCRUM', 'Jira', 'Microsoft Teams']} {pdfPrint} />
		</ExperienceItem>

		<!-- Ericeira -->
		<ExperienceItem
			company="Ericeira surf camp"
			dateRange="2021/06 - 2021/08"
			role="Freelance developer"
			description="Local Surf and water gear rental business that also provides coaching."
			technologies={[
				'Core: Wordpress, Squarespace, PHP, HTML, CSS, Javascript, Adobe XD',
			]}
			responsibilities={[
				'Aligning expectations and defining delivarables.',
				'Redesigning the current site and implementing the new design in Wordpress.',
				'Scouting the competition and improving the SEO.'
			]}
		>
			<TechBadges labels={['Wordpress', 'Squarespace', 'PHP', 'HTML', 'CSS', 'Javascript', 'Adobe XD', 'SEO', 'Performance optimization', 'Design', 'UX']} {pdfPrint} />
		</ExperienceItem>

		<!-- Wedio -->
		<ExperienceItem
			company="Wedio"
			dateRange="2019/08 - 2021/05"
			role="Lead frontend developer"
			description="Video and audio gear online rental marketplace."
			technologies={[
				'Frontend: Nuxt, Vue, Javacscript, Vuex, Webpack, SCSS',
				'Backend: EC2, C#, ASP.NET, Node.js, MySql, S3, Lightsail',
				'Other: Ghost CMS, Storybook',
				'Operations: Docker, Github Actions',
			]}
			responsibilities={[
				'Building, maintaining and taking full ownership for the Frontend.',
				'Managing a team of 4 frontend interns.',
				'Managing, communicating and planning features and releases with stakeholders.',
				'Working with SEO experts from bonzer.dk to optimize ranking and performance of the website.',
				'Contributing to the Nuxt.js ecosystem.',
				'Creating a custom CMS solution for marketing.',
			]}
		>
			<TechBadges labels={['Javascript', 'Vue', 'Nuxt.js', 'Vuex', 'Webpack', 'SCSS', 'Storybook', 'Ghost CMS', 'AWS', 'S3', 'Lightsail', 'Codepipeline', 'Codebuild', 'Node.js', 'Monday', 'Team Management', 'SEO', 'Adobe XD']} {pdfPrint} />
		</ExperienceItem>

		<!-- Nuvopoint -->
		<ExperienceItem
			company="Nuvopoint / Tillty"
			dateRange="2017/08 - 2019/04"
			role="Software developer"
			description="Point of sales system specifically designed for local retailers."
			technologies={[
				'Frontend: Typescript, Angular, RxJs',
				'Backend: Firebase, Firestore',
				'Mobile: Cordova Apache, Flutter, Nativescript, Java',
			]}
			responsibilities={[
				'Writting Frontend UI as well as constantly optimizing the code for performance gains',
				'Planning and setting up the data structures in the frontend using Typescript and aligning them in the backend on firebase.',
				'Migrating the project to different cross platform technologies.',
				'Writting plugins for Cordova Apache using Java.',
			]}
		>
			<TechBadges labels={['Typescript', 'Dart', 'Angular', 'Rxjs', 'Java', 'Firebase', 'Flutter', 'Cordova Apache', 'Nativescript', 'Cross platform development']} {pdfPrint} />
		</ExperienceItem>

		<br />
		<br />

		<!-- Bottom portion -->
		<h1 class="text-2xl md:text-3xl font-light h1LetterSpacing">
			PERSONAL PROJECTS
		</h1>
		<hr />
		<br />

		<!-- Portfolio -->
		<ExperienceItem
			company="Portfolio website"
			description="I originally built this website because updating my CV in Figma was a slow and tortorous task. Since then it has become so much more and I am continously expanding it."
		>
			<TechBadges labels={['React', 'Typescript', 'Next.js', 'Node.js', 'Github actions']} {pdfPrint} />
		</ExperienceItem>

		<!-- Portfolio -->
		<ExperienceItem
			company="DNA Syntehsizer Audio plugin"
			description="A friend of mine cotnacted me to make a VST audio plugin that uses DNA information to create sound. Currently I am learning C++ and building it."
		>
			<TechBadges labels={['C++', 'JUCE']} {pdfPrint} />
		</ExperienceItem>

		<h1 class="text-2xl md:text-3xl font-light h1LetterSpacing">
			EDUCATION
		</h1>
		<hr />
		<br />

		<ExperienceItem
			company="Bachelor, Web development"
			role="Business academy aarhus"
			dateRange="2018/02 - 2019/06"
			genericListItems={[
				'Interface design and digital aesthetics. UX & UI.',
				'Web frontend. Prototyping. Mockups.',
				'Mobile Application Development. Android.',
				'Development environments. A variety of CMS.',
				'VR and AR Development. Unity. Oculus Go.',
				'Databases. PostgreSQL, MySQL.',
			]}
		/>

		<ExperienceItem
			company="AP, Computer Science"
			role="Business academy aarhus"
			dateRange="2015/09 - 2018/01"
			genericListItems={[
				'System development. Architecture. Abstractions. Common patterns.',
				'Databases. PostgreSQL, MySQL.',
				'Security.',
				'Algorithms and Data Structures.',
			]}
		/>

		<br />
		<br />

		<h1 class="text-2xl md:text-3xl font-light h1LetterSpacing">
			OTHER EXPERIENCE
		</h1>
		<hr />
		<br />

		<ExperienceItem
			company="AUHACK 2019"
			dateRange=""
			headerLink="https://bit.ly/2YaRX5F"
			genericListItems={[
				'Created a REST API using GoLang',
				'Assisted in creating an android mobile application'
			]}
		/>

		<ExperienceItem
			company="AUHACK 2018"
			dateRange=""
			headerLink="https://bit.ly/2XSX6Uu"
			genericListItems={[
				'Created a REST API using Node.js',
				'Created a web application using Angular',
				'Created a mobile application using Ionic'
			]}
		/>
	</div>
</div>


