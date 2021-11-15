<script context="module">
	export async function load({ page }) {
		let slug = page.params.slug;
		return {
			props: {
				slug
			}
		};
	}
</script>

<script>
	export let slug;
	import SuggestionsStore from '$lib/stores/suggestions.js';
	import Main from '$lib/base/Main.svelte';
	import Icon from '$lib/decoration/Icon.svelte';
	import { fly } from 'svelte/transition';
	import { loadCommentsFromFirebase } from '$lib/scripts/firebase.js';
	import UserStore from '$lib/stores/user.js';
	let selectedSuggestion = {};
	let loaded = false;
	let comments;

	$: if ($SuggestionsStore.length !== 0) {
		loaded = true;
		selectedSuggestion = $SuggestionsStore.find((s) => s.link === slug);
	}

    const loadComments = async (suggestionID) => {
        comments = await loadCommentsFromFirebase(suggestionID);
    }

	$: if (loaded && $UserStore) {
		loadComments(selectedSuggestion.id);
	}
</script>

<Main>
	{#if loaded}
		<div
			class="w-full p-[3rem] bg-gray-100 rounded-2xl grid auto-rows-min gap-[0.5rem] mt-16"
			id={selectedSuggestion.id}
			transition:fly={{ duration: 400, y: 15 }}>
			<span
				class=" py-[0.4rem] px-[0.8rem] text-gray-50 font-bold text-[1.2rem] bg-gray-700 inline
				w-min rounded-xl">
				Suggestion
			</span>
			<h1 class="text-[3.6rem]">{selectedSuggestion.name}</h1>
			<p class="text-[1.6rem]">{selectedSuggestion.description}</p>
			<div class="flex gap-3 items-center mt-8">
				<Icon name="chat" width="2rem" class=" text-pink-600" />
				<p class=" text-pink-600 font-bold text-[1.3rem]">Discuss the suggestion below</p>
			</div>
		</div>
	{/if}
</Main>
<!-- 

    A comment must have: {
        username: 'rafal',
        userImageURL: 'link',
        comment: 'Text, bla bla bla.',
        timestamp: 'date',
        replies: []
    }

    Each reply must have: {
        username: 'hussain',
        userImageURL: 'link',
        comment: 'I agree, bla bla bla.',
        timestamp: 'date',
    }

 -->

 <!-- 

    USer sign up journey => 

    1. User signs up with whatever method they choose. 
    2. The inputs for sign up are: 
        - email
        - password
        - username
        - photoURL (optional)

    3. The inputs for sign in are:
        - email
        - password
    4. If using github/google the username will be the displayName without any
       spacing and lowercased.
    5. Once the user selects a sign up option 

  -->

<style>

</style>
