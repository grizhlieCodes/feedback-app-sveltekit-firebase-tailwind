<script>
	//Dispatch & Svelte
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { fly } from 'svelte/transition';

	//Data
	import { thirdPartyOptions } from '../thirdPartyOptions';
	import { signInInputOptions } from '../signInInputOptions';
	const formHeaderData = {
		header: 'Sign In',
		description: `Sign in with google <br>or email & password.`
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
	<div>
		<MultipleInputs inputsArray={signInInputOptions} bind:dataToSend />
		<button
			type="button"
			on:click={() => dispatch('switchState', 'resetPassword')}
			class=" outline-none text-[1.2rem] font-bold text-indigo-700 opacity-75 hover:opacity-100
			focus:opacity-100 hover:underline focus:underline">
			Forgot Password?
		</button>
	</div>

	<div class=" w-full flex justify-between child-center max-w-[28rem]">

		<AuthButton
			buttonType="button"
			buttonStyling="secondary"
			text="Sign Up"
			state="signUp"
			on:switchState />
		<AuthButton buttonType="submit" buttonStyling="primary" text="Sign In" />

	</div>

</div>
