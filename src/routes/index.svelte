<script>
	import Main from '$lib/base/Main.svelte';
	import WelcomeSuggestions from '$lib/home/WelcomeSuggestions.svelte';
	import Authentication from '$lib/new-auth-form/Authentication.svelte';
	import ShowComponent from '$lib/stores/homepageShowComponent.js'
	import UserStore from '$lib/stores/user.js'
	import LoginController from '$lib/stores/loginController';

	// let showComponent = {
	// 	name: 'auth'
	// };

	$: if($UserStore.user){
		ShowComponent.updateOnMount()
	}

	const updateShowComponent = (e) => {
		let name = e.detail //auth/suggestions
		ShowComponent.updateShowComponent(name)
	};
</script>

<Main>
	{#if $ShowComponent === 'auth' && $LoginController.status !== 'complete'}
		<Authentication on:updateShowComponent={updateShowComponent}/>
	{:else}
		<WelcomeSuggestions on:updateShowComponent={updateShowComponent} />
	{/if}
</Main>
