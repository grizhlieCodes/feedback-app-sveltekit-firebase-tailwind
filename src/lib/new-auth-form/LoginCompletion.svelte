<script>
	//Dispatch & Svelte
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { fly } from 'svelte/transition';

	//Components
	import Spinner from '$lib/loading-signin/Spinner.svelte';

	//Data
	export let transitionData;

	//State
	import LoginController from '$lib/stores/loginController';

	//Functions

	const updateLoginState = (newState) => {
		dispatch('updateLoginState', newState);
	};
</script>

<div
	in:fly={transitionData.in}
	out:fly={transitionData.out}
	class="w-[25rem] h-full flex flex-col justify-center items-center gap-8 center-child">
	{#if $LoginController.status === 'pending'}
		<Spinner />
	{:else if $LoginController.status === 'success'}
		<p class="text-[3rem] font-bold text-center">You're now signed in.</p>

		<button
			type="button"
			class="px-8 py-4 bg-gray-300 rounded-xl text-2xl hover:bg-green-300 transition-colors"
			on:click={() => updateLoginState('loginComplete')}>
			Alright, alright alright...
		</button>
	{:else if $LoginController.status === 'error'}
		<p class="text-[3rem] font-bold text-center">
			{$LoginController.errorMessages.userExistsError}
		</p>
		<button
			type="button"
			class="px-8 py-4 bg-gray-300 rounded-xl text-2xl hover:bg-green-300 transition-colors"
			on:click={() => updateLoginState('error')}>
			Try again
		</button>
	{:else if $LoginController.status === 'resetSent'}
		<p class="text-[3rem] font-bold text-center">
			{$LoginController.confirmationMessage.passwordResetSent}
		</p>
		<button
			type="button"
			class="px-8 py-4 bg-gray-300 rounded-xl text-2xl hover:bg-green-300 transition-colors"
			on:click={() => updateLoginState('default')}>
			Back to Sign In
		</button>
	{/if}
</div>
