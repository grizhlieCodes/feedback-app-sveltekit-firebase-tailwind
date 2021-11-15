<script>
	import { fly } from 'svelte/transition';
	export let name = 'testName',
		type = 'text',
		placeholder = ' ',
		label = 'Label',
		value = '',
		leadingIcon = '',
		trailingIcon = '',
		valid = true,
		errorMessage = 'Error message',
		helpText = '',
		maxLength = 10000;

	// error = ''

	let touched = false;

	$: charCount = value.split('').length

	$: invalid = touched && !valid;
	//Leading and trailing logic will be built later?
	$: leadingIconPadding = leadingIcon ? 'pl-[4.8rem]' : 'pl-[1.6rem]';
	$: trailingIconPadding = trailingIcon ? 'pr-[4.8rem]' : 'pr-[1.6rem]';
	$: labelLeft = leadingIcon ? 'left-[4.8rem]' : 'left-[1.6rem]';
</script>

<!-- Container for top and bottom of input -->
<!-- Adjust min-w to control the entire component width. -->
<div class="min-w-[25rem] w-full h-auto">
	<!-- Top will make the main body of this element -->
	<div id="top" class="w-full h-[5.6rem] relative">
		<!-- Leading Icon (infront of text) -->
		<!-- Trailing Icon -->
		<!-- <input data-name="password"> -->
		<input
			data-name={name} 
			{type}
			{placeholder}
			id="input-{name}"
			{value}
			on:blur={() => (touched = true)}
			on:input
			{maxLength}
			class="w-full h-full bg-gray-200 dark:bg-gray-700 focus-within:bg-gray-300
			dark:focus-within:bg-gray-900 text-[1.6rem] px-[4.8rem] pt-5 pb-1 {invalid ? 'text-red-600 caret-red-600 border-red-600 dark:text-red-400 dark:caret-red-400 dark:border-red-400' : 'text-gray-900 caret-indigo-600 border-gray-500 dark:text-gray-200 dark:caret-indigo-400'}
			outline-none border-0 border-b-[1px] rounded-tr-md rounded-tl-md peer transition-colors
			duration-300 {leadingIconPadding}
			{trailingIconPadding}
			" />

		<label
			for="input-{name}"
			class="absolute top-1/2 -translate-y-1/2 {labelLeft} text-[1.6rem]
			peer-focus-within:text-[1.2rem] peer-focus-within:translate-y-[-135%] transition-all
			duration-300 {invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-500'}">
			{label}
			{#if invalid}
				<span>*</span>
			{/if}
		</label>

		<div
			class="absolute h-[2px] bottom-0 left-0 w-full {invalid ? 'bg-red-600 dark:bg-red-400' : 'bg-indigo-600 dark:bg-indigo-400'}
			origin-center transition-all scale-x-0 peer-focus-within:scale-x-100 duration-300" />
	</div>
	<div id="bottom" class=" {leadingIconPadding} {trailingIconPadding} min-h-[1.9rem] h-[1.9rem] flex justify-between gap-8 pt-1 w-full">
		<div id="left">
			{#if invalid}
				<p
					transition:fly={{ duration: 300, x: 25 }}
					class="h-full  text-[1.2rem] text-red-600 dark:text-red-400">
					{errorMessage}
				</p>
			{:else if !invalid && helpText}
				<p
					transition:fly={{ duration: 300, x: 25 }}
					class="h-full  text-[1.2rem] text-gray-900 dark:text-gray-400">
					{helpText}
				</p>
			{/if}
		</div>
		{#if maxLength !== 10000}
			<p
				transition:fly={{ duration: 300, x: 25 }}
				class="h-full text-[1.2rem] text-gray-900 dark:text-gray-400">
				{charCount}/{maxLength}
			</p>
		{/if}
	</div>

</div>

<style>
	input:not(:placeholder-shown) ~ label {
		transform: translateY(-135%);
		font-size: 1.2rem;
	}

	#left {
		display: grid;
	}

	#left p {
		grid-column: 1/2;
		grid-row: 1/2;
	}
</style>
