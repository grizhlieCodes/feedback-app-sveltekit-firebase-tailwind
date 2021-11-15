<script>
	import { fly } from 'svelte/transition';
	import Modal from '$lib/base/Modal.svelte';
	import Spinner from '$lib/loading-signin/Spinner.svelte';
	import loginController from '$lib/stores/loginController.js';
    
    const handleClick = (e) => {
        loginController.completeSuccessfulAuth()
    };
</script>

{#if $loginController.showAuthModalConfirmation}
	<!-- UPDATE ON OUTROEND. IF THERE IS A USER, SHOW CONTENT? -->
	<Modal on:outroend>
		{#if $loginController.status === 'pending'}
			<Spinner />
		{:else if $loginController.status === 'success'}
			<p class="text-[3rem] font-bold text-center" transition:fly={{ x: 200, duration: 150 }}>
				You're now signed in.
			</p>

			<button
				class="px-8 py-4 bg-gray-300 rounded-xl text-2xl hover:bg-green-300 transition-colors"
				on:click={handleClick}>
				Alright, alright alright...
			</button>
		{:else if $loginController.status === 'error'}
			<p class="text-[3rem] font-bold text-center" transition:fly={{ x: 200, duration: 150 }}>
				{$loginController.errorMessages.userExistsError}
			</p>
			<button
				class="px-8 py-4 bg-gray-300 rounded-xl text-2xl hover:bg-green-300 transition-colors"
				on:click={handleClick}>
				Try again
			</button>
		{/if}

	</Modal>
{/if}
