<script>
	//Svelte
	import '../app.css';
	import { onMount } from 'svelte';

	//Components
	import FluidNav from '$lib/fluid-nav/FluidNav.svelte';
	import MenuModal from '$lib/menu-modal/MenuModal.svelte';

	//Data
	import { menuFormData } from '$lib/dataScripts/menuInputsButtonsData';

	console.log(menuFormData)

	//State
	import UserStore from '$lib/stores/user.js';
	import ShowComponent from '$lib/stores/homepageShowComponent.js';

	//Functions
	import {
		addSuggestionToFirestore,
		loadSuggestionsFromFirebase,
		signOutUser
	} from '$lib/scripts/firebase.js';

	//The below logic simply updates the site with suggestions if all criteria is met.
	let mounted = false;
	let loadedSuggestionsOnMount = false;
	onMount(() => {
		mounted = true;
		if ($UserStore.user) {
			loadSuggestionsFromFirebase();
			loadedSuggestionsOnMount = true;
		}
	});

	$: if (mounted && !loadedSuggestionsOnMount && $UserStore.user) {
		loadSuggestionsFromFirebase();
	}

	let showModal = false;

	const handleMenuButton = (e) => {
		let name = e.detail;
		console.log(name)
		updateSelectedMenuItem(name)
		showModal = !showModal;
	};

	let selectedMenuItem = {...menuFormData[0]}

	const updateSelectedMenuItem = (itemName) => {
		const newlySelectedItem = {...menuFormData[itemName]};
		selectedMenuItem = newlySelectedItem
	};

	const toggleShowModal = () => {
		showModal = !showModal
	};
</script>

<div
	id="body"
	class="w-full max-w-[111rem] h-full flex-grow flex flex-col items-center justify-start gap-8">
	<FluidNav on:menuButtonClicked={handleMenuButton}>
		<img src="/logo.png" slot="logo" alt="" class="h-full" />
	</FluidNav>
	<MenuModal {showModal} {selectedMenuItem} on:toggleShowModal={toggleShowModal} />
	<div class="h-full flex-grow-1 w-full grid place-items-center">
		<slot />
	</div>
</div>
