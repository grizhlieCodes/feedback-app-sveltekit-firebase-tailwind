<script>
	import '../app.css';
	// import { auth } from '$lib/scripts/firebase.js';
	import { writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';
	// import UserStore from '$lib/stores/user.js';
	import FluidNav from '$lib/fluid-nav/FluidNav.svelte';
	import { calcRealSize } from '$lib/scripts/helpers.js';
	import { signOutUser } from '$lib/scripts/firebase.js';
	// let firebaseAuthStore = writable(null);
	// setContext('firebaseAuthStore', firebaseAuthStore);

	// onMount(() => {
	// 	firebaseAuthStore.set(auth);
	// });

	let innerWidth,
		realSize = writable('');
	setContext('size', realSize);
	$: realWidth = innerWidth - 10;
	$: realSize.set(calcRealSize(realWidth));

	const signOut = () => {
		signOutUser();
	};
</script>

<svelte:window bind:innerWidth />

<div id="body" class="w-full max-w-[111rem] h-[200vh] flex flex-col items-center gap-8">
	<FluidNav on:signOut={signOut}>
		<img src="/logo.png" slot="logo" alt="" class="h-full" />
	</FluidNav>
	<slot />
</div>
