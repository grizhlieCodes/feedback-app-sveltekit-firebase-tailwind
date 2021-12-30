<script>
	//Svelte
import { onMount } from 'svelte';
	
	//State
	import UserStore from '$lib/stores/user.js';

	//Helpers
	import { returnUserImage, returnUserLetter } from '$lib/scripts/helpers.js';
	$: userImage = returnUserImage($UserStore);;
	$: console.log(userImage)
	$: userLetter = userImage ? null : returnUserLetter($UserStore);

</script>

<button
	class="rounded-full w-[4.2rem] h-[4.2rem] overflow-hidden bg-indigo-500
	hover:bg-indigo-600 focus:bg-indigo-700 hover:opacity-75 focus:opacity-75 transition-all" on:click>
	{#if userImage}
		<img src={userImage} alt="User profile" class="w-full h-full object-cover object-center" />
	{:else}
		<span class="text-[1.5rem] font-bold uppercase">{userLetter}</span>
	{/if}
</button>

<style>

</style>
