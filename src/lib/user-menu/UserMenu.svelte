<script>
	//Svelte
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { fly } from 'svelte/transition';


	//Data
	let flyData = { in: { y: 25, duration: 300 }, out: { y: 25, duration: 300 } };
	import { signOutUser } from '$lib/scripts/firebase';
	//State
	import UserStore from '$lib/stores/user.js';

	//Components
	import UserBadge from './UserBadge.svelte';
	import Button from './UserMenuButton.svelte';

	//Helpers
	let badgeClicked = false;

	//Functions

	const closeMenu = (e) => {
		let key = e.key;
		if (key !== 'Escape') return;
		if (!badgeClicked) return;
		toggleBadgeClicked();
		window.removeEventListener('keydown', closeMenu);
	};

	const toggleBadgeClicked = () => {
		badgeClicked = !badgeClicked;
		window.addEventListener('keydown', closeMenu);
	};

	const handleMenuClick = (menuItem) => {
		dispatch('menuButtonClicked', menuItem);
		console.log('running');
	};

	const signUserOut = () => {
		signOutUser();
	};
</script>

<!-- image-container OR first letter of username or email -->
<!-- Badge -->
<div
	class="h-[4.2rem] w-[4.2rem] ml-8 grid place-items-center relative"
	on:click={toggleBadgeClicked} transition:fly={{duration: 350, x:25 }}>
	<UserBadge />
	{#if badgeClicked}
		<div
			in:fly={flyData.in}
			out:fly={flyData.out}
			class="absolute min-w-[20rem] rounded-xl bg-gray-900 top-0 right-0 flex flex-col items-center
			overflow-hidden w-max">

			<div
				id="upper-container"
				class="w-full px-8 py-8 flex flex-col items-center justify-center gap-8 ">

				<UserBadge />
				<p class="text-center text-gray-100 text-3xl font-bold ">Welcome Rafal</p>

			</div>
			<div class="h-[1px] w-[90%] bg-gray-700" />

			<div
				class="bg-gray-900 h-max w-full px-16 py-8 flex flex-col items-center justify-center gap-4">

				<Button content="Add Suggestion" on:click={() => handleMenuClick('addSuggestion')} />

				<Button content="Reset Password" on:click={() => handleMenuClick('resetPassword')} />

				<Button
					content="Update Profile Image"
					on:click={() => handleMenuClick('updateProfileURL')} />

				<Button
					content="Update Display Name"
					on:click={() => handleMenuClick('updateDisplayName')} />

				<Button content="Update Email" on:click={() => handleMenuClick('updateEmail')} />

				<Button content="Sign Out" on:click={signUserOut} />

			</div>
		</div>
	{/if}
</div>
