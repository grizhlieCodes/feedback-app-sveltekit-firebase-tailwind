<script>
	//Dispatch & Svelte
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { fly } from 'svelte/transition';

	//Data
	import { resetPasswordInput } from '../resetPasswordInput';
	const formHeaderData = {
		header: 'Reset Password',
		description: `Type in your email <br> to reset your password.`
	};
	export let transitionData;
	export let dataToSend;

	//Components
	import MultipleInputs from '../MultipleInputs.svelte';
	import Divider from '../Divider.svelte';
	import AuthButton from '../AuthButton.svelte';
	import FormHeader from '../FormHeader.svelte';
</script>

<div
	in:fly={transitionData.in}
	out:fly={transitionData.out}
	id="form-area-container"
	class="w-full max-w-[43rem] flex flex-col gap-[5rem] center-child">
	<FormHeader {...formHeaderData} />
	<Divider />
	<MultipleInputs inputsArray={resetPasswordInput} bind:dataToSend={dataToSend} />

	<div class=" w-full flex justify-between child-center max-w-[28rem]">

		<AuthButton
			buttonType="button"
			buttonStyling="secondary"
			text="Sign In"
			state="signIn"
			on:switchState />
		<AuthButton buttonType="submit" buttonStyling="primary" text="Reset Password" />
	</div>
</div>

<style>

</style>
