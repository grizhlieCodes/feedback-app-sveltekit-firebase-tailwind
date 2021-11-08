<script>
    export let value = "", name = "", type = "text"
</script>

<label for="{type}-input" class="relative group text-[1.8rem] w-full max-w-[28rem]">

    <input
        data-name="{type}"
        {type}
        {value}
        on:input
        id="{type}-input"
        name="{type}-input"
        placeholder=""
        autocomplete="off"
        class="px-8 py-8 placeholder-gray-400::placeholder w-full border-0 bg-gray-200 rounded-lg focus:scale-105 transition-all" />
    <p
        class="absolute left-8 top-10 -translate-y-1/4 transition-transform
        group-focus-within:-translate-y-24 group-focus-within:-translate-x-2
        group-focus-within:scale-75 group-focus-within:text-gray-400 group-focus-within:opacity-0.5  outline-none border-0 ">
        {name}
    </p>
</label>

<style>
	label > input:not(:placeholder-shown) ~ p {
		transform: translate(-0.5rem, -6rem) scale(0.75);
		border: none;
		outline: none;
        opacity: 0.5;
	}
</style>