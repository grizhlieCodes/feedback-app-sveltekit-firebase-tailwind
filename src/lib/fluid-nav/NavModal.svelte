<script>
	import { fly } from 'svelte/transition';
</script>

<div
	class="w-full h-[max-content] max-w-[90%] absolute top-[120%] left-[50%] translate-x-[-50%] bg-gray-50
	shadow-lg ring-1 ring-black ring-opacity-5 rounded-lg sm:hidden px-10 py-10 dark:bg-gray-700
	transition-colors"
	transition:fly={{ y: 5 }}>
	<slot />
</div>
