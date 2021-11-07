<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
	export let formStateSignUp = true,
		type = '';

    const dispatchToggleState = () => {
        dispatch('toggleState')
    }
</script>

{#if type === 'submit'}
	<button
		type="submit"
		class=" py-[2rem] text-center text-[1.8rem] bg-indigo-700 hover:bg-indigo-800 hover:scale-105
		transition-all text-gray-50 rounded-[1.4rem] flex-1 focus:scale-105 ">
		{formStateSignUp ? 'Sign up' : 'Sign in'}
	</button>
{:else}
	<button
		type="button"
		class=" text-center py-[2rem] text-[1.8rem] bg-gray-600 hover:bg-gray-800 hover:scale-105
		transition-all text-gray-50 rounded-[1.4rem] flex-1 focus:scale-105 "
		on:click={dispatchToggleState}>
		{formStateSignUp ? 'Or sign in' : 'Or sign up'}
	</button>
{/if}

