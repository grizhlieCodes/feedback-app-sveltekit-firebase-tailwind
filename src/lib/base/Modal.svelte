<script>
	import { fly, fade } from 'svelte/transition';
</script>

<div
	in:fly={{ x: 300, duration: 250 }} out:fly={{x: -300, duration: 500}}
	on:outroend
	class="clickable-modal fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-max h-[50rem]
	grid place-items-center gap-8 bg-gray-100 z-[100] rounded-xl p-16">
	<slot />
</div>

<div transition:fade={{duration: 250}} class="fixed w-screen h-screen opacity-50 bg-black top-0 left-0 z-[60]" on:click/>
