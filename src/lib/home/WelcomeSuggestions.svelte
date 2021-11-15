<script>
	//Svelte
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { fly } from 'svelte/transition';

	//State
	import UserStore from '$lib/stores/user.js';
	import loginController from '$lib/stores/loginController.js';

	//Components
	import Suggestions from '$lib/suggestions/Suggestions.svelte';

	//Data
	let transitionData = { in: { x: 200, duration: 400 }, out: { x: -200, duration: 400 } };
	
	//Functions/Helpers
	$: showContent = $loginController.status === 'complete' && $UserStore.user;

	const updateShowComponent = () => {
		dispatch('updateShowComponent', 'auth')
	};
</script>

{#if showContent}
	<div
		in:fly={transitionData.in}
		out:fly={transitionData.out}
		on:outroend={updateShowComponent}
		class="w-full h-full flex flex-col items-center gap-32 center-child">
		<h1 class="text-gray-50 text-[3rem]">Welcome {$UserStore.user.email}</h1>
		{#if $UserStore.user.photoURL}
			<img src={$UserStore.user.photoURL} alt="" class=" h-12" />
		{/if}
		<Suggestions />
	</div>
{/if}
