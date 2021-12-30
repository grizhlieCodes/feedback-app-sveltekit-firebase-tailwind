<script>
	//Svelte
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	const dispatch = createEventDispatcher();
	import { fly } from 'svelte/transition';

	//Components
	import Modal from '$lib/base/Modal.svelte';
	import MultipleInputs from './MultipleInputs.svelte';
	import FormHeader from '$lib/new-auth-form/FormHeader.svelte';
	import AuthButton from '$lib/new-auth-form/AuthButton.svelte';
	import NormalButton from '$lib/user-menu/Button.svelte';

	//State
	import UserOptions from '$lib/stores/userOptions';
	export let showModal = false;

	//Data
	let flyOptions = { in: { x: 100, duration: 350 }, out: { x: -100, duration: 350 } };
	export let selectedMenuItem = undefined;
	import {
		addSuggestionToFirestore,
		updateDisplayName,
		signOutUser,
		updateProfileImage,
		auth,
		sendPasswordResetInternal
	} from '$lib/scripts/firebase.js';
	$: inputs = selectedMenuItem.inputs;
	$: button = selectedMenuItem.button;
	$: header = selectedMenuItem.header;
	let inputsData;

	//Functions

	$: console.log(selectedMenuItem);

	//Handle Form
	const handleForm = () => {
		let menuItemClicked = button.funcString;
		let message = selectedMenuItem.successMessage.message;
		if (menuItemClicked === 'addSuggestion') {
			addSuggestion(inputsData, message);
		} else if (menuItemClicked === 'resetPassword') {
			// This
			let email = inputsData.email;
			sendPasswordResetInternal(auth, email, message);
			console.log('resetting password');
		} else if (menuItemClicked === 'updateDisplayName') {
			let newDisplayName = inputsData.displayName;
			updateDisplayName(newDisplayName);
		} else if (menuItemClicked === 'updateProfileURL') {
			// This
			let photoURL = inputsData.profileURL;
			updateProfileImage(photoURL, message);
			console.log('updating profile url');
		} else if (menuItemClicked === 'updateEmail') {
			// This
		} else if (menuItemClicked === 'signOut') {
			signOutUser();
		}
	};

	//Toggle Show Modal
	const toggleShowModal = () => {
		dispatch('toggleShowModal');
		UserOptions.setToDefault();
	};

	//Add Suggestion
	const addSuggestion = (dataObject, message) => {
		const suggestionName = dataObject.suggestionName;
		const suggestionDescription = dataObject.suggestionDescription;
		const linkName = suggestionName.toLowerCase().replace(/\s/gm, '-');
		let data = { suggestionName, suggestionDescription, linkName };
		addSuggestionToFirestore(data, message);
	};

	const handleGlobalClick = (e) => {
		const item = e.target
		const isDiv = e.target.closest('div')
		const divIsModal = isDiv.classList.contains('clickable-modal')
		console.log({item, isDiv, divIsModal})
		// if (e.target.closest('div').classList.contains('clickable-modal')) {
		// 	console.log(e.target.closest('div'));
		// }
	};

	let mounted = false;

	onMount(() => {
		mounted = true;
		if(mounted){
			window.addEventListener('click', handleGlobalClick);
		}
	});

	onDestroy(() => {
		if(mounted){
			window.removeEventListener('click', handleGlobalClick);
		}
	});
</script>

{#if showModal}
	<Modal on:click={toggleShowModal}>
		{#if $UserOptions.state === 'default'}
			<form
				in:fly={flyOptions.in}
				out:fly={flyOptions.out}
				action=""
				class=" w-full min-h-[30rem] h-max flex flex-col py-16 px-24 gap-[2rem] center-child"
				on:submit|preventDefault={handleForm}>
				<FormHeader header={header.header} description={header.description} />
				<MultipleInputs inputsArray={inputs} bind:dataToSend={inputsData} />
				<AuthButton buttonType="submit" buttonStyling="primary" text={button.text} />
			</form>
		{:else if $UserOptions.state === 'success'}
			<div
				class="w-full min-h-[30rem] h-max flex flex-col py-16 px-24 gap-[2rem] center-child"
				in:fly={flyOptions.in}
				out:fly={flyOptions.out}>
				<p class="text-[2rem] max-w-[30rem] text-center">{$UserOptions.message}</p>
				<NormalButton text="Ok - close" on:click={toggleShowModal} />
			</div>
		{/if}
	</Modal>
{/if}
