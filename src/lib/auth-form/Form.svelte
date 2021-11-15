<script>
	import Input from './Input.svelte';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import FinalButton from './FinalButton.svelte';
	import ThirdPartyAuthOption from './ThirdPartyAuthOption.svelte';
	import UserStore from '$lib/stores/user.js';

	export let formData;

	let formInputs = formData.formInputs;
	const otherSignIns = formData.otherSignIns;

	let formInputValues = {};

	formInputs.forEach((i) => {
		formInputValues[i.name] = '';
	});

	let formStateSignUp = true;

	$: if(formStateSignUp){
		formInputs = formData.formInputs
	} else {
		formInputs = formData.formInputs.filter(i => {
			const notPhotoURL = i.name !== 'photoURL';
			const notUsername = i.name !== 'username'
			if(notPhotoURL && notUsername){
				return i
			}
		})
	}

	const submitForm = (e) => {
		let data = { ...formInputValues };
		dispatch('authFormSubmitted', { data: { ...data }, formStateSignUp });
	};

	const updateValues = (e) => {
		let inputEl = e.target;
		let value = inputEl.value;
		let name = `${inputEl.dataset.name}`;
		formInputValues[name] = value;
	};

	const toggleFormStateSignUp = () => {
		formStateSignUp = !formStateSignUp;
	};

	const handleThirdPartyOption = (e) => {
		const optionSelected = e.detail;
		dispatch('thirdPartyOptionSelected', `${optionSelected}`);
	};
</script>

{#if !$UserStore.user}

	<form
		transition:fly={{ duration: 300, x: 300 }}
		on:outroend
		action="submit"
		autocomplete="off"
		class="w-full max-w-[43rem] bg-gray-50 flex flex-col items-center justify-center py-28 px-8
		rounded-lg gap-[5rem] m-auto justify-self-center"
		on:submit|preventDefault={submitForm}>

		{#each otherSignIns as option}
			<ThirdPartyAuthOption
				{formStateSignUp}
				{...option}
				on:ThirdPartyAuthOptionClicked={handleThirdPartyOption} />
		{/each}

		<div class="h-[0.1rem] w-3/4 bg-gray-200" />

		{#each formInputs as input}
			<Input {...input} on:input={updateValues} value={formInputValues[input.name]}  />
		{/each}

		<div id="buttons-container" class="flex flex-col gap-8 w-full max-w-[28rem] phablet:flex-row">
			<FinalButton type="submit" {formStateSignUp} />
			<FinalButton type="toggle" {formStateSignUp} on:toggleState={toggleFormStateSignUp} />
		</div>
	</form>
{/if}
