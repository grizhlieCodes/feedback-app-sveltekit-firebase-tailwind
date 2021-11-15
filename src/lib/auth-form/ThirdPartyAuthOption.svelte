<script>
    export let formStateSignUp, name = "fix", image

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const handleClick = (e) => {
        let el = e.target.closest('button')
        let optionName = el.dataset.name
        dispatch('ThirdPartyAuthOptionClicked', `${optionName}`)
    }
</script>

<button
	type="button"
	class="px-8 py-8 w-full border-0 bg-gray-200 rounded-lg flex gap-4 items-center text-[1.8rem]
	max-w-[28rem] focus:scale-105 active:scale-105 hover:scale-105 transition-all text-center
	justify-center"
    data-name="{name}"
    on:click={handleClick}
    >
	<img src="{image}" alt="" class="w-[3rem] " />
	<p class="">{formStateSignUp ? 'sign up' : 'sign in'} with {name}</p>
</button>

<style>

</style>
