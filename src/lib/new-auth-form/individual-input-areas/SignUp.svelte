<script>
	//Dispatch & Svelte
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { fly } from 'svelte/transition';

	//Data
	import { thirdPartyOptions } from '../thirdPartyOptions';
	import { signUpInputOptions } from '../signUpInputOptions';
	const formHeaderData = {
		header: 'Sign Up',
		description: `Sign up with google <br>or email & password.`
	};
	export let transitionData;

	//Exports
	export let formState;
	export let dataToSend;

	//Components
	import ThirdPartyAuthOption from '../ThirdPartyAuthOption.svelte';
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
	<ThirdPartyAuthOption {formState} {...thirdPartyOptions} on:ThirdPartyAuthOptionClicked />
	<Divider />
	<MultipleInputs inputsArray={signUpInputOptions} bind:dataToSend={dataToSend} />

	<div class=" w-full flex justify-between child-center max-w-[28rem]">

		<AuthButton
			buttonType="button"
			buttonStyling="secondary"
			text="Sign In"
			state="signIn"
			on:switchState />
		<AuthButton buttonType="submit" buttonStyling="primary" text="Sign Up" />
	</div>

</div>

<style>

</style>
