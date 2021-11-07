<script>
	import Input from './Input.svelte';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import FinalButton from './FinalButton.svelte';
	import OtherSignInOption from './OtherSignInOption.svelte';
	export let formData

	//Defaults Form Inputs Data
	const formInputs = formData.formInputs
	//Form Other Sign ins
	const otherSignIns = formData.otherSignIns

	//Data
	let formInputValues = {};

	formInputs.forEach(i => {
		formInputValues[i.name] = ""
	})


	//State
	let formStateSignUp = true;

	const submitForm = (e) => {
		let data = { ...formInputValues };

		//Once you sign up/in we dispatch the data + the state of sign up/in
		dispatch('authFormSubmitted', {...data, formStateSignUp});
	};

	//Update data on input
	const updateValues = (e) => {
		let inputEl = e.target
		let value = inputEl.value;
		let name = `${inputEl.dataset.name}`;
		formInputValues[name] = value;
	};

	const toggleFormStateSignUp = () => {
		formStateSignUp = !formStateSignUp;
	};

	const handleOtherSignIn = (e) => {
		const optionSelected = e.detail;
		dispatch('otherSignInClicked', `${optionSelected}`)
		// Select what to do to sign in with an external option
		// console.trace(`Change this. Selected button: ${optionSelected}`)
	};

</script>

<form
	transition:fly={{ duration: 300, x: 300 }}
	action="submit"
	autocomplete="off"
	class="w-full max-w-[43rem] bg-gray-50 flex flex-col items-center justify-center py-28 px-8
	rounded-lg gap-[5rem]"
	on:submit|preventDefault={submitForm}>

	{#each otherSignIns as option}
		<OtherSignInOption {formStateSignUp} {...option} on:otherSignInOptionClicked={handleOtherSignIn} />
	{/each}

	<div class="h-[0.1rem] w-full bg-gray-200" />

	{#each formInputs as input}
		<Input {...input} on:input={updateValues} value="{formData[input.type]}"/>
	{/each}

	<div id="buttons-container" class="flex flex-col gap-8 w-full max-w-[28rem] phablet:flex-row">
		<FinalButton type="submit" {formStateSignUp} />
		<FinalButton type="toggle" {formStateSignUp} on:toggleState={toggleFormStateSignUp} />
	</div>
</form>

<style>

</style>
