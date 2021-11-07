<script>
    import { createEventDispatcher } from 'svelte';
	import {fly} from 'svelte/transition'
    const dispatch = createEventDispatcher();
	const signUpUser = () => {};

	import TextInput from './TextInput.svelte';
	let email = '',
		password = '';

	let data = {
		email: '',
		password: ''
	};


	const updateValues = (e) => {
		let value = e.target.value;
		let name = `${e.target.dataset.name}`;
		data[name] = value;
	};

	let formStateSignUp = true;

	const submitForm = (e) => {
		console.log('running SubmitForm')
        dispatch('formSubmitted', {formStateSignUp, email: data.email, password: data.password})
    };

	const toggleState = () => {
		formStateSignUp = !formStateSignUp;
	};
</script>

<form
	transition:fly={{duration: 300, x: 300}}
	action="submit"
	on:submit={signUpUser}
	autocomplete="off"
	class="w-full max-w-[43rem] bg-gray-50 flex flex-col items-center justify-center py-28 px-8 rounded-lg
	gap-[5rem]"
	on:submit|preventDefault={submitForm}>

    <button type="button" class="px-8 py-8 w-full border-0 bg-gray-200 rounded-lg flex gap-4 items-center text-[1.8rem] max-w-[28rem] focus:scale-105 active:scale-105 hover:scale-105 transition-all">
        <img src="/github.png" alt="" class="w-[3rem] 	">
	<p class="">{formStateSignUp ? 'sign up' : 'sign in'} with github</p>
    </button>
    <button type="button" class="px-8 py-8 w-full border-0 bg-gray-200 rounded-lg flex gap-4 items-center text-[1.8rem] max-w-[28rem] focus:scale-105 active:scale-105 hover:scale-105 transition-all" on:click={() => dispatch('signInWithGoogle')}>
        <img src="/google.png" alt="" class="w-[3rem] 	">
        <p class="">{formStateSignUp ? 'sign up' : 'sign in'} with google</p>
    </button>

    <div class="h-[0.1rem] w-full bg-gray-200"></div>

	<TextInput value={email} type="email" description="email" on:input={updateValues} />
	<TextInput value={password} type="password" description="password" on:input={updateValues} />

	<div id="buttons-container" class="flex flex-col gap-8 w-full max-w-[28rem] phablet:flex-row">
		<button
			type="submit"
			class=" py-[2rem] text-center text-[1.8rem] bg-indigo-700 hover:bg-indigo-800 hover:scale-105
			transition-all text-gray-50 rounded-[1.4rem] flex-1  focus:scale-105 ">
			{formStateSignUp ? 'Sign up' : 'Sign in'}
		</button>
		<button
			type="button"
			class=" text-center py-[2rem] text-[1.8rem] bg-gray-600 hover:bg-gray-800 hover:scale-105
			transition-all text-gray-50 rounded-[1.4rem] flex-1  focus:scale-105 "
			on:click={toggleState}>
			{formStateSignUp ? 'Or sign in' : 'Or sign up'}
		</button>
	</div>
</form>
