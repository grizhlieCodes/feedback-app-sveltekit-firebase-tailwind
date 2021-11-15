<script>
	//Svelte
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	//Firebase
	import { handleForm, handleThirdPartyLogin } from '$lib/scripts/firebase';

	//Components
	import SignIn from './individual-input-areas/SignIn.svelte';
	import SignUp from './individual-input-areas/SignUp.svelte';
	import ResetPassword from './individual-input-areas/ResetPassword.svelte';
	import LoginCompletion from './LoginCompletion.svelte';

	//State
	import LoginController from '$lib/stores/loginController';
	import UserStore from '$lib/stores/user';
	let formState = {
		state: 'signIn'
	};

	//Data
	let dataToSend;
	let transitionData = { in: { x: 200, duration: 400 }, out: { x: -200, duration: 400 } };

	const submitForm = () => {
		handleForm(formState, dataToSend);
		formState.state = 'submitting';
	};

	onMount(() => {
		setTimeout(() => {
			if ($LoginController.status === 'success') {
				formState.state = 'submitting';
			}
		}, 500);
	});

	$: if (!$UserStore.user) {
		formState.state = 'signIn';
	}

	const switchState = (e) => {
		let state = e.detail;
		formState.state = state;
	};

	let switchingState = false;

	const toggleSwitchingState = () => {
		switchingState = !switchingState;
		setTimeout(() => {
			switchingState = !switchingState;
		}, 400);
	};

	$: if (formState) {
		toggleSwitchingState();
	}

	const completeSignIn = () => {
		LoginController.completeSuccessfulAuth();
	};

	const resetForm = () => {
		LoginController.setToDefault();
		formState.state = 'signIn';
	};

	const updateShowComponent = () => {
		dispatch('updateShowComponent', 'suggestions');
	};

	const signInWithThirdParty = (e) => {
		let name = e.detail;
		handleThirdPartyLogin(name);
		formState.state = 'submitting';
	};

	const updateLoginState = (e) => {
		let newState = e.detail;

		if (newState === 'loginComplete') {
			completeSignIn();
		} else if (newState === 'error' || newState === 'default') {
			resetForm();
		}
	};
</script>

<form
	in:fly={transitionData.in}
	out:fly={transitionData.out}
	on:outroend={updateShowComponent}
	action="submit"
	autocomplete="off"
	class=" min-h-[76.5rem] overflow-hidden bg-gray-50 grid py-28 px-24 rounded-lg gap-[5rem] m-auto
	justify-self-center relative center-child"
	on:submit|preventDefault={submitForm}>

	<div
		class="w-full absolute h-3 bg-indigo-400 origin-left {switchingState ? 'scale-x-100 opacity-100' : ' scale-x-0 opacity-0'}
		transition-transform duration-[350ms]" />

	{#if formState.state === 'signIn'}
		<SignIn
			{formState}
			on:switchState={switchState}
			bind:dataToSend
			{transitionData}
			on:ThirdPartyAuthOptionClicked={signInWithThirdParty} />
	{:else if formState.state === 'signUp'}
		<SignUp
			{formState}
			on:switchState={switchState}
			bind:dataToSend
			{transitionData}
			on:ThirdPartyAuthOptionClicked={signInWithThirdParty} />
	{:else if formState.state === 'resetPassword'}
		<ResetPassword on:switchState={switchState} bind:dataToSend {transitionData} />
	{:else if formState.state === 'submitting'}
		<LoginCompletion on:updateLoginState={updateLoginState} {transitionData} />
	{/if}
</form>
