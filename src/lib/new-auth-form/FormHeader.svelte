<script>
    export let header = '', description = '';
</script>

<div id="text-container" class="w-full flex flex-col gap-4 items-center">
    <img src="/comedian-badge.png" alt="" class=" w-16">
    <h2 class="w-full text-center text-4xl">{header}</h2>
    <p class="self-center w-3/4 text-center text-2xl">{@html description}</p>
</div>