<script>
	import SuggestionsStore from '$lib/stores/suggestions.js';
	import Icon from '$lib/decoration/Icon.svelte';

</script>

<div
	id="suggestions-container"
	class="flex-grow w-full grid grid-cols-1 phone-wide:grid-cols-2 tablet:grid-cols-3 gap-16
	auto-rows-max">
	{#each $SuggestionsStore as { name, description, link, id }, i}
		<a
			data-id={id}
			href="/suggestion/{link}"
			class="w-full h-full bg-gray-200 rounded-xl p-12 grid grid-cols-1 justify-start gap-4 group
			hover:bg-yellow-400 focus:bg-yellow-400 transition-all cursor-pointer hover:scale-105
			focus:scale-105"
			tabindex="0">
			<h2 class=" text-3xl font-bold">{name}</h2>
			<p class=" text-2xl ">{description}</p>
			<div
				class=" self-end flex h-[min-content] w-min gap-4 px-6 py-3 text-gray-50 bg-gray-500
				rounded-full group-hover:bg-gray-50 group-hover:text-gray-600 transition-colors">
				<Icon name="chat" width="1.73rem" class="text-gray-50 group-hover:text-gray-600" />
				<span class=" text-2xl">Discuss</span>
			</div>
		</a>
	{/each}
</div>

<style>
	#suggestions-container > a {
		grid-template-rows: min-content min-content 1fr;
	}
</style>
