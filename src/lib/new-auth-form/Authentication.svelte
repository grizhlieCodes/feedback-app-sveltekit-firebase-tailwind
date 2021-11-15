<script>
	import Form from './Form.svelte';
	import LoginController from '$lib/stores/loginController';
</script>

{#if $LoginController.status !== 'complete'}
	 <Form on:updateShowComponent  />
{/if}
