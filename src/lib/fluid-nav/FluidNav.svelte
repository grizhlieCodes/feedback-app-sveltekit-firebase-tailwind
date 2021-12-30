<script>
	import { fly } from 'svelte/transition';
	import BurgerMenu from './BurgerMenu.svelte';
	import NavModal from './NavModal.svelte';
	import MobileLink from './MobileLink.svelte';
	import SignOut from './SignOut.svelte';
	import AddSuggestion from './AddSuggestion.svelte';
	import { getContext } from 'svelte';
	import UserStore from '$lib/stores/user.js';
	import UserMenu from '$lib/user-menu/UserMenu.svelte'

	let size = getContext('size');

	let links = [
		{
			name: 'Home',
			path: '/',
			smallName: 'home'
		},
		{
			name: 'About',
			path: '/about',
			smallName: 'about'
		},
		{
			name: 'Services',
			path: '/services',
			smallName: 'services'
		}
	];

	let burgerMenuClicked = false;

	const handleBurgerClick = () => {
		burgerMenuClicked = !burgerMenuClicked;
	};

	let scrollY;
	$: fluidOn = scrollY > 0 ? true : false;
</script>

<svelte:window bind:scrollY />

<header
	class="transition-all w-full flex justify-between items-center dark:border-gray-700 z-50 {fluidOn && $size === 'desktop' ? 'fixed translate-y-[2rem] bg-white max-w-[36rem] phone-wide:max-w-[42rem] tablet-small:max-w-[60rem] tablet:max-w-[72rem] tablet-wide:max-w-[80rem] px-16 rounded-full py-4 dark:bg-gray-900' : 'relative py-12 px-10 border-b-[1px] border-gray-200 max-w-[111rem]'}
	">
	<div class="h-[5rem]">
		<slot name="logo" />
	</div>

	<BurgerMenu {burgerMenuClicked} on:burgerClicked={handleBurgerClick} />

	{#if burgerMenuClicked}
		<NavModal>
			{#each links as link}
				<MobileLink {link} />
			{/each}
			<div class="h-[1rem]" />
		</NavModal>
	{/if}
	<nav class="hidden sm:flex flex-row w-full justify-end items-center">
		{#each links as { path, name }}
			<a href={path} class="flex flex-row items-center justify-start gap-10">
				<p
					class="text-[1.5rem] text-gray-300 hover:bg-gray-900 dark:text-gray-300 px-8 py-4
					dark:hover:bg-gray-700 rounded-lg transition-colors">
					{name}
				</p>
			</a>
		{/each}
		{#if $UserStore.user}
			<UserMenu on:menuButtonClicked/>
		{/if}
	</nav>

</header>

<style>
	/* header {
		transition: top 200ms ease;
	} */
</style>
