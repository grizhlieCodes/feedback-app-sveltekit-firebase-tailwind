<script>
	import '../app.css';
	// import { writable } from 'svelte/store';
	import { onMount, setContext, onDestroy } from 'svelte';
	import FluidNav from '$lib/fluid-nav/FluidNav.svelte';
	// import { calcRealSize } from '$lib/scripts/helpers.js';
	import Modal from '$lib/base/Modal.svelte'
	import {addSuggestionToFirestore, loadSuggestionsFromFirebase, signOutUser} from '$lib/scripts/firebase.js'
	import TextInput from '$lib/ui/TextInput.svelte'
	import UserStore from '$lib/stores/user.js'

	//The below logic simply updates the site with suggestions if all criteria is met.
	let mounted = false;
	let loadedSuggestionsOnMount = false;
	onMount(() => {
		mounted = true
		if($UserStore.user){
			loadSuggestionsFromFirebase()
			loadedSuggestionsOnMount = true;
		}
	})

	$: if(mounted && !loadedSuggestionsOnMount && $UserStore.user){
		loadSuggestionsFromFirebase()
	}
	
	let showAddSuggestion = false;

	const toggleShowSuggestion = () => {
		showAddSuggestion = !showAddSuggestion
	}

	const handleNavButtonClick = (e) => {
		let clickType = e.detail;
		if (clickType === 'signOut') {
			signOutUser();
		} else if (clickType = 'addSuggestion'){
			toggleShowSuggestion()
		}
	};

	let suggestionName = "", suggestionDescription = "", linkName = ""

	const addSuggestion = () => {
		linkName = suggestionName.toLowerCase().replace(/\s/gm,'-')
		let data = {suggestionName, suggestionDescription, linkName}
		addSuggestionToFirestore(data)
		toggleShowSuggestion()
	}

</script>

<div
	id="body"
	class="w-full max-w-[111rem] h-full flex-grow flex flex-col items-center justify-start gap-8">
	<FluidNav on:navButtonClicked={handleNavButtonClick}>
		<img src="/logo.png" slot="logo" alt="" class="h-full" />
	</FluidNav>
	{#if showAddSuggestion}
		 <Modal on:click={toggleShowSuggestion}>
			<TextInput name="suggestionName" bind:value={suggestionName} type="text" />
			<TextInput name="suggestionDescription" bind:value={suggestionDescription} type="text" />
			<button on:click={addSuggestion}>Add Suggestion</button> 
		 </Modal>
	{/if}
	<slot />
</div>
