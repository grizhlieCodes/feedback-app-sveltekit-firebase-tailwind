<script>
	import Icon from '$lib/decoration/Icon.svelte'
    export let link
</script>

<a href="{link.path}" class="w-full px-4 py-5 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex flex-row items-center justify-start gap-5">
						
    <Icon name="{link.smallName}" width="2.4rem" class="stroke-current text-teal-500 dark:text-teal-400"/>
    
    <p class="font-sans text-[1.6rem] text-gray-500 dark:text-gray-300 transition-colors">{link.name}</p>			
</a>