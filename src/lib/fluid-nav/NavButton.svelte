<script>
	export let content = 'Update this',
		dispatchName = 'changeThisDispatchName',
		type = 'button', link = "/";
	import { scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('navButtonClicked', `${dispatchName}`);
	};
</script>

{#if type === 'button'}
	<button
		transition:scale={{ duration: 200 }}
		type="button"
		class=" ml-4 px-8 py-4 text-[1.5rem] text-gray-400 bg-gray-700 rounded-xl hover:scale-105
		focus:scale-105 transition-all focus:bg-gray-600 focus:text-gray-300 hover:bg-gray-600
		hover:text-gray-300"
		on:click={handleClick}>
		{content}
	</button>
{:else if type === 'link'}
	<a
		href="{link}"
		transition:scale={{ duration: 200 }}
		type="button"
		class=" ml-4 px-8 py-4 text-[1.5rem] text-gray-400 bg-gray-700 rounded-xl hover:scale-105
		focus:scale-105 transition-all focus:bg-gray-600 focus:text-gray-300 hover:bg-gray-600
		hover:text-gray-300"
		on:click={handleClick}>
		{content}
	</a>
{/if}
