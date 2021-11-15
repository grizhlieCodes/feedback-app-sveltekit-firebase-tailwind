<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let buttonStyling = 'secondary',
		text = '',
		state = '';

	const dispatchSwitchState = () => {
		dispatch('switchState', state);
	};
</script>

{#if buttonStyling === 'primary'}
	<button
		type="submit"
		class=" outline-none py-[1rem] text-center text-[1.4rem] font-bold bg-indigo-700
		hover:bg-indigo-800 hover:outline-white transition-all text-gray-50 rounded-[1.4rem]
		focus:bg-indigo-800 px-8">
		{text}
	</button>
{:else}
	<button
		type="button"
		class=" outline-none text-center py-[1rem] text-[1.4rem] hover:bg-indigo-50 transition-all
		text-gray2-500 font-bold rounded-[1.4rem] focus:bg-indigo-200 relative z-0"
		on:click={dispatchSwitchState}>
		{text}
	</button>
{/if}

<style>
	button[type='button']:hover::before,
	button[type='button']:focus::before {
		content: '';
		position: absolute;
		width: 150%;
		height: 4.1rem;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		--tw-bg-opacity: 1;
		background-color: rgba(224, 231, 255, var(--tw-bg-opacity));
		z-index: -1;
		border-radius: 1.4rem;
	}
</style>
