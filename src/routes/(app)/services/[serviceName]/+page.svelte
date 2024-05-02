<script>
	import Announcer from '$lib/components/blocks/announcer.svelte';

    export let data
    $: data
</script>


<section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-10 mx-auto place-content-evenly">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-8 lg:px-6">
        <div class="max-w-screen-xl mb-8 lg:mb-16 gap-2">
            <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-800 dark:text-white">{data.service.title}</h2>
            <p class="text-gray-500 sm:text-xl dark:text-gray-400">{data.service.sub}</p>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            {#each data.service.services as serve}
                <div>
                    <h3 class="mb-2 text-xl font-bold dark:text-white">{serve.Name}</h3>
                    <p class="text-gray-500 dark:text-gray-400">{serve.content}</p>
                </div>  
            {/each}
            
        </div>
    </div>
    <Announcer img={data.service.img}/>
</section>
