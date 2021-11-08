<script>
	import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
	import { fly, fade } from 'svelte/transition';
	import AuthForm from '$lib/auth/AuthForm.svelte';
	import authentication from '$lib/stores/user.js';
	import Main from '$lib/base/Main.svelte';
	import UserStore from '$lib/stores/user.js';
	import Modal from '$lib/loading-signin/Modal.svelte';
	import Spinner from '$lib/loading-signin/Spinner.svelte';
	import { getContext, onMount } from 'svelte';
	import AuthenticationForm from '$lib/auth-form/Form.svelte';
	import { handleEmailLogin, handleThirdPartyLogin } from '$lib/scripts/firebase.js';

	// import {AuthFormData} from '$lib/auth-form/authFormData'
	const formData = {
		formInputs: [
			{
				name: 'email',
				type: 'email'
			},
			{
				name: 'password',
				type: 'password'
			}
		],
		otherSignIns: [
			{
				name: 'github',
				image: '/github.png'
			},
			{
				name: 'google',
				image: '/google.png'
			}
		]
	};

	let firebaseAuthStore = getContext('firebaseAuthStore');
	let googleProvider = new GoogleAuthProvider();
	let githubProvider = new GithubAuthProvider();
	let user = true;
	let loading = false;
	let loadingFinished = false;

	onMount(() => {
		setTimeout(() => {
			if (!$UserStore.user) {
				user = false;
			}
		}, 250);
	});

	const handleForm = (e) => {
		let formStateSignUp = e.detail.formStateSignUp;
		let email = e.detail.email;
		let password = e.detail.password;
		handleEmailLogin(formStateSignUp, email, password);
		handleLoginModal();
	};

	const handleOtherSignIn = (e) => {
		let signInOption = e.detail;
		handleThirdPartyLogin(signInOption)
	};


	$: if ($UserStore.user) {
		user = true;
	} else {
		user = false;
	}

	const handleLoginModal = () => {
		loading = true;
		setTimeout(() => {
			loadingFinished = true;
		}, 700);
		setTimeout(() => {
			loading = false;
			loadingFinished = false;
		}, 1300);
	};
</script>

<Main>
	{#if !$UserStore.user && !user}
		<AuthenticationForm
			{formData}
			on:authFormSubmitted={handleForm}
			on:otherSignInClicked={handleOtherSignIn} />
	{/if}
	{#if loading}
		<Modal>
			{#if !loadingFinished}
				<Spinner />
			{:else}
				<p class="text-[3rem] font-bold center-child" transition:fly={{ x: 200, duration: 150 }}>
					You're now signed in.
				</p>
			{/if}
		</Modal>
	{/if}
	{#if user && $UserStore.user && $UserStore.userDisplayName}
		<h1 class="text-gray-50 text-[3rem]">Welcome {$UserStore.userDisplayName}</h1>
	{:else if user && !$UserStore.userDisplayName && $UserStore.user.email}
		<h1 class="text-gray-50 text-[3rem]">Welcome {$UserStore.user.email}</h1>
	{/if}
</Main>
