<script>
	import MaterialInput from '$lib/new-auth-form/TextInput.svelte';

	//Data array needs to be loaded. Below is test data.
	export let inputsArray = [];

	//Declare an object that will be updated as we input data.
	// We will bind this this variable inside the parent component.
	export let dataToSend = {};

	//helper function
	const isEmpty = (val) => {
		return val.trim().length === 0;
	};

	//function that updates input's validity.
	const updateInputValidity = (inputEmpty, inputIndex) => {
		if (inputEmpty) {
			inputsArray[inputIndex].valid = false;
			inputsArray[inputIndex].errorMessage = "Can't be empty.";
		} else {
			inputsArray[inputIndex].valid = true;
			inputsArray[inputIndex].errorMessage = '';
		}
	};

	//Function that updates dataToSend as well as the value of the input (bound)
	const updateInputdata = (inputValue, inputName, inputIndex) => {
		dataToSend[inputName] = inputValue;
		inputsArray[inputIndex].value = inputValue;
	};

	//This function handles our input. We don't need to do anything further apart from dispatching/sending the dataToSend somewhere. This function will receive and process the data and will update our dataObject as needed.
	const handleInput = (e) => {
		let element = e.target;
		let inputValue = element.value;
		let inputName = element.dataset.name; //email
		let inputIndex = inputsArray.findIndex((i) => i.name === inputName); //0
		let inputEmpty = isEmpty(inputValue); //false
		updateInputValidity(inputEmpty, inputIndex);
		updateInputdata(inputValue, inputName, inputIndex);
	};
</script>

<div class="w-full inputs-container flex flex-col gap-8 center-child">
	{#each inputsArray as input}
		<MaterialInput {...input} on:input={handleInput} />
	{/each}
</div>