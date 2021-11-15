<script>
	import Main from '$lib/base/Main.svelte';
	import WelcomeSuggestions from '$lib/home/WelcomeSuggestions.svelte';
	import Authentication from '$lib/new-auth-form/Authentication.svelte';

	let showComponent = {
		name: 'auth'
	};

	const updateShowComponent = (e) => {
		let name = e.detail //auth/suggestions
		showComponent.name = name
	};
</script>

<Main>
	{#if showComponent.name === 'auth'}
		<Authentication on:updateShowComponent={updateShowComponent}/>
	{:else}
		<WelcomeSuggestions on:updateShowComponent={updateShowComponent} />
	{/if}
</Main>
